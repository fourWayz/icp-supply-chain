// Import necessary modules and libraries
import {
    query,
    update,
    text,
    Record,
    StableBTreeMap,
    Variant,
    Vec,
    None,
    Some,
    Ok,
    Err,
    ic,
    Principal,
    Opt,
    nat64,
    int32,
    Duration,
    Result,
    bool,
    Canister,
    blob,
    init,
} from 'azle';
import { Ledger, binaryAddressFromPrincipal, hexAddressFromPrincipal } from 'azle/canisters/ledger';

//@ts-ignore
import { hashCode } from 'hashcode';
import { v4 as uuidv4 } from 'uuid';
import encodeUtf8 from 'encode-utf8';

// Define types

// Define a Product record
const Product = Record({
    id: text, // Product ID
    name: text, // Product name
    description: text, // Product description
    manufacturer: text, // Manufacturer of the product
    timestamp: nat64, // Timestamp of when the product was created
});

// Define a Shipment record
const Shipment = Record({
    id: text, // Shipment ID
    productId: text, // ID of the product being shipped
    from: text, // Origin of the shipment
    to: text, // Destination of the shipment
    status: text, // Current status of the shipment
    timestamp: nat64, // Timestamp of when the shipment was created
});

// Define a Location record
const Location = Record({
    name: text, // Location name
    latitude: int32, // Latitude coordinate
    longitude: int32, // Longitude coordinate
});

// Define a Transaction record
const Transaction = Record({
    id: text, // Transaction ID
    shipmentId: text, // ID of the shipment associated with the transaction
    location: Location, // Location where the transaction occurred
    timestamp: nat64, // Timestamp of when the transaction took place
});

// Define a Payload record for adding products
const AddProductPayload = Record({
    name: text, // Name of the product to be added
    description: text, // Description of the product to be added
});

// Define a Payload record for adding shipments
const AddShipmentPayload = Record({
    productId: text, // ID of the product to be shipped
    from: text, // Origin of the shipment
    to: text, // Destination of the shipment
});

// Define a Payload record for updating shipment status
const UpdateShipmentStatusPayload = Record({
    shipmentId: text, // ID of the shipment to update
    status: text, // New status for the shipment
});

// Define a Payment record
const Payment = Record({
    orderId: text, // Payment order ID
    fee: nat64, // Fee associated with the payment
    status: text, // Current status of the payment
    payer: Principal, // Principal of the payer
    paid_at_block: Opt(nat64), // Block at which the payment was made
    memo: nat64, // Memo associated with the payment
});

// Define a Message variant for response messages
const Message = Variant({
    Exists: text, // Message indicating existence
    NotFound: text, // Message indicating not found
    InvalidPayload: text, // Message indicating an invalid payload
    PaymentFailed: text, // Message indicating payment failure
    PaymentCompleted: text, // Message indicating payment completion
    Success: text, // Success message
    Fail: text, // Failure message
});

// Define mappings for storage
const products = StableBTreeMap(0, text, Product); // Mapping for products
const shipments = StableBTreeMap(1, text, Shipment); // Mapping for shipments
const transactions = StableBTreeMap(2, text, Vec(Transaction)); // Mapping for transactions
const paymentOrders = StableBTreeMap(3, text, Payment); // Mapping for payment orders

// Define constants
const ORDER_RESERVATION_PERIOD = 120n; // Reservation period in seconds

// Define the Ledger canister
const ledgerCanister = Ledger(Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'));

// Define the main canister functionality
export default Canister({
    // Initialization function
    init: init([], () => {
        // Initialization logic here
    }),

    // Add a product function
    addProduct: update([AddProductPayload, nat64, nat64], Result(Message, Message), async (payload, block, memo) => {
        const productId = uuidv4();
        const product = {
            id: productId,
            name: payload.name,
            description: payload.description,
            manufacturer: ic.caller().toText(),
            timestamp: ic.time(),
        };
        products.insert(productId, product);
        return Ok({ Success: `Product added with ID ${productId}` });
    }),

    // Add a shipment function
    addShipment: update([AddShipmentPayload, nat64, nat64], Result(Message, Message), async (payload, block, memo) => {
        const shipmentId = uuidv4();
        const shipment = {
            id: shipmentId,
            productId: payload.productId,
            from: payload.from,
            to: payload.to,
            status: 'Pending',
            timestamp: ic.time(),
        };
        shipments.insert(shipmentId, shipment);
        return Ok({ Success: `Shipment added with ID ${shipmentId}` });
    }),

    // Update shipment status function
    updateShipmentStatus: update([UpdateShipmentStatusPayload, nat64, nat64], Result(Message, Message), async (payload, block, memo) => {
        const shipmentId = payload.shipmentId; // Extract shipment ID from payload
        const shipment = shipments.get(shipmentId); // Retrieve shipment from storage
        
        if (!shipment) { // Check if shipment exists
            return Err({ NotFound: `Shipment with ID ${shipmentId} not found` }); // Return error if shipment not found
        }
        
        const updatedShipment = { ...shipment.Some, status: payload.status }; // Update shipment status
        
        shipments.insert(shipmentId, updatedShipment); // Insert updated shipment back into storage
        
        return Ok({ Success: `Shipment status updated for ID ${shipmentId}` }); // Return success message
    }),

    
    // Get product details function
    getProductDetails: query([text], Result(Product, Message), (productId) => {
        const product = products.get(productId); // Retrieve product from storage
        
        if (!product) { // Check if product exists
            return { Err: { NotFound: `Product with ID ${productId} not found` }}; // Return error if product not found
        }
        
        return Ok(product.Some); // Return product details
    }),
      

    // Get shipment details function
    getShipmentDetails: query([text], Result(Shipment, Message), (shipmentId) => {
        const shipment = shipments.get(shipmentId); // Retrieve shipment from storage
        
        if (!shipment) { // Check if shipment exists
            return { Err: { NotFound: `Shipment with ID ${shipmentId} not found` } }; // Return error if shipment not found
        }
        
        return { Ok: shipment.Some }; // Return shipment details
    }),

    // Create payment order function
    createPaymentOrder: update([], Result(Payment, Message), () => {
        const orderId = uuidv4(); // Generate payment order ID
        const paymentOrder = {
            orderId, // Assign payment order ID
            fee: BigInt(100), // Example fee, should be calculated based on transaction cost
            status: 'Pending', // Initial status of the payment order
            payer: ic.caller(), // Principal of the payer
            paid_at_block: None, // Block at which the payment was made
            memo: hashCode().value(orderId), // Memo associated with the payment order
        };
        paymentOrders.insert(orderId, paymentOrder); // Insert payment order into storage
        discardByTimeout(paymentOrder.memo, ORDER_RESERVATION_PERIOD); // Schedule payment order discard
        return Ok(paymentOrder); // Return payment order details
    }),

    // Helper function to get the canister address
    getCanisterAddress: query([], text, () => {
        return hexAddressFromPrincipal(ic.id(), 0); // Get canister address
    }),

    // Helper function to get address from principal
    getAddressFromPrincipal: query([Principal], text, (principal) => {
        return hexAddressFromPrincipal(principal, 0); // Get address from principal
    }),

   // Helper function to get product count
   getProductCount: query([], int32, () => {
    return Number(products.len().toString()); // Return product count
}),

// Helper function to get shipment count
getShipmentCount: query([], int32, () => {
    return Number(shipments.len().toString()); // Return shipment count
}),
});

// Utility functions

// Discard payment order by timeout
function discardByTimeout(memo: nat64, delay: Duration) {
    ic.setTimer(delay, () => {
        const order = paymentOrders.remove(memo); // Remove payment order from storage
        console.log(`Order discarded ${order}`); // Log discarded payment order
    });
}