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
    Canister,
    init,
} from 'azle'; // Removed unnecessary imports
import { Ledger, hexAddressFromPrincipal } from 'azle/canisters/ledger'; // Removed unnecessary imports
import { v4 as uuidv4 } from 'uuid';
import { hashCode } from 'hashcode';

// Define types

// Define a Product record
const Product = Record({
    id: text,
    name: text,
    description: text,
    manufacturer: text,
    timestamp: nat64,
});

// Define a Shipment record
const Shipment = Record({
    id: text,
    productId: text,
    from: text,
    to: text,
    status: text,
    timestamp: nat64,
});

// Define a Transaction record
const Transaction = Record({
    id: text,
    shipmentId: text,
    location: Record({
        name: text,
        latitude: int32,
        longitude: int32,
    }),
    timestamp: nat64,
});

// Define a Payload record for adding products
const AddProductPayload = Record({
    name: text,
    description: text,
});

// Define a Payload record for adding shipments
const AddShipmentPayload = Record({
    productId: text,
    from: text,
    to: text,
});

// Define a Payload record for updating shipment status
const UpdateShipmentStatusPayload = Record({
    shipmentId: text,
    status: text,
});

// Define a Payment record
const Payment = Record({
    orderId: text,
    fee: nat64,
    status: text,
    payer: Principal,
    paidAtBlock: Opt(nat64),
    memo: nat64,
});

// Define a Message variant for response messages
const Message = Variant({
    Exists: text,
    NotFound: text,
    InvalidPayload: text,
    PaymentFailed: text,
    PaymentCompleted: text,
    Success: text,
    Fail: text,
});

// Define mappings for storage
const products = StableBTreeMap(0, text, Product);
const shipments = StableBTreeMap(1, text, Shipment);
const paymentOrders = StableBTreeMap(2, text, Payment); // Removed transactions mapping

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
    addProduct: update([AddProductPayload], Result(Message, Message), async (payload) => {
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
    addShipment: update([AddShipmentPayload], Result(Message, Message), async (payload) => {
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
    updateShipmentStatus: update([UpdateShipmentStatusPayload], Result(Message, Message), async (payload) => {
        const shipmentId = payload.shipmentId;
        const shipment = shipments.get(shipmentId);
        
        if (!shipment) {
            return Err({ NotFound: `Shipment with ID ${shipmentId} not found` });
        }
        
        const updatedShipment = { ...shipment.Some, status: payload.status };
        shipments.insert(shipmentId, updatedShipment);
        
        return Ok({ Success: `Shipment status updated for ID ${shipmentId}` });
    }),

    // Create payment order function
    createPaymentOrder: update([], Result(Message, Message), () => {
        const orderId = uuidv4();
        const paymentOrder = {
            orderId,
            fee: BigInt(100),
            status: 'Pending',
            payer: ic.caller(),
            paidAtBlock: None,
            memo: hashCode().value(orderId),
        };
        paymentOrders.insert(orderId, paymentOrder);
        discardByTimeout(paymentOrder.memo, ORDER_RESERVATION_PERIOD);
        return Ok(paymentOrder);
    }),

    // Helper function to get the canister address
    getCanisterAddress: query([], text, () => {
        return hexAddressFromPrincipal(ic.id(), 0);
    }),

    // Helper function to get address from principal
    getAddressFromPrincipal: query([Principal], text, (principal) => {
        return hexAddressFromPrincipal(principal, 0);
    }),

    // Helper function to get product count
    getProductCount: query([], int32, () => {
        return Number(products.len().toString());
    }),

    // Helper function to get shipment count
    getShipmentCount: query([], int32, () => {
        return Number(shipments.len().toString());
    }),
});

// Utility function to discard payment order by timeout
function discardByTimeout(memo, delay) {
    ic.setTimer(delay, () => {
        const order = paymentOrders.remove(memo);
        console.log(`Order discarded ${order}`);
    });
}
