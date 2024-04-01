// Import necessary modules and libraries
import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

// Function to add a new product
export async function addProduct(productData) {
    try {
        return await window.canister.marketplace.addProduct(productData);
    } catch (error) {
        console.log(error,'error adding product');
    }
}

// Function to add a new shipment
export async function addShipment(shipmentData) {
    try {
        return await window.canister.marketplace.addShipment(shipmentData);
    } catch (error) {
        console.log(error,'error adding shipment');
    }
}

// Function to update shipment status
export async function updateShipmentStatus(shipment) {
    try {
        return await window.canister.marketplace.updateShipmentStatus(shipment);
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

// Function to get total shipment count
export async function getShipmentCount() {
    try {
        return await window.canister.marketplace.getShipmentCount();
    } catch (error) {
        console.error("Error fetching shipment count:", error);
    }
}

// Function to update product details
export async function updateProduct(productData) {
    try {
        return await window.canister.marketplace.updateProduct(productData);
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