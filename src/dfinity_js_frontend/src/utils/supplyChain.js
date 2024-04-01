// Import necessary modules and libraries
import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

// Function to add a new product
export async function addProduct(payload,memo,block) {
    try {
        return await window.canister.marketplace.addProduct(payload,memo,block);
    } catch (error) {
        console.log(error,'error adding product');
    }
}

// Function to add a new shipment
export async function addShipment(payload,memo,block) {
    try {
        return await window.canister.marketplace.addShipment(payload,memo,block);
    } catch (error) {
        console.log(error,'error adding shipment');
    }
}

// Function to update shipment status
export async function updateShipmentStatus(payload,memo,block) {
    try {
        return await window.canister.marketplace.updateShipmentStatus(payload,memo,block);
    } catch (error) {
        console.log(error,'error updating shipment status');
    }
}

// Function to get product details by ID
export async function getProductDetails(productId) {
    try {
        return await window.canister.marketplace.getProductDetails(productId);
    } catch (error) {
        console.log(error, 'Error fetching product details');
        return [];
    }
}

// Function to get shipment details by ID
export async function getShipmentDetails(shipmentId) {
    try {
        return await window.canister.marketplace.getShipmentDetails(shipmentId);
    } catch (error) {
        console.error("Error fetching shipment details:", error);
        return [];
    }
}

// Function to get total product count
export async function getProductCount() {
    try {
        return await window.canister.marketplace.getProductCount();
    } catch (error) {
        console.error("Error fetching product count:", error);
    }
}

// Function to get total products
export async function getAllProducts() {
    try {
        return await window.canister.marketplace.getProducts();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Function to get total shipment count
export async function getShipmentCount() {
    try {
        return await window.canister.marketplace.getShipmentCount();
    } catch (error) {
        console.error("Error fetching shipment count:", error);
    }
}

// Function to get total shipments
export async function getAllShipments() {
    try {
        return await window.canister.marketplace.getShipments();
    } catch (error) {
        console.error("Error fetching shipments:", error);
    }
}

// Function to update product details
export async function updateProduct(payload,memo,block) {
    try {
        return await window.canister.marketplace.updateProduct(payload,memo,block);
    } catch (error) {
        console.error("Error updating product:", error);
    }
}

// Function to cancel a shipment
export async function cancelShipment(shipmentId) {
    try {
        return await window.canister.marketplace.cancelShipment(shipmentId);
    } catch (error) {
        console.error("Error cancelling shipment:", error);
    }
}
