import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";


export async function addProduct(productData) {
    try {
        return await window.canister.marketplace.addProduct(productData);
    } catch (error) {
        console.log(err,'error adding product')
    }
}

export async function addShipment(shipmentData) {
    try {
        return await window.canister.marketplace.addShipment(shipmentData);
    } catch (error) {
        console.log(err,'error adding shipment')
    }
}

export async function updateShipmentStatus(shipment) {
    try {
        return await window.canister.marketplace.updateShipmentStatus(shipment);
    } catch (error) {
        console.log(err,'error adding shipment')
    }
}



export async function buyCourse(courseId) {
  const courseCanister = window.canister.marketplace;
  const orderResponse = await marketplace.createOrder(courseId);
  const sellerPrincipal = Principal.from(orderResponse.Ok.seller);
  const sellerAddress = await courseCanister.getAddressFromPrincipal(sellerPrincipal);
  const block = await transferICP(sellerAddress, orderResponse.Ok.price, orderResponse.Ok.memo);
  await courseCanister.completePurchase(sellerPrincipal, courseId, orderResponse.Ok.price, block, orderResponse.Ok.memo);
}

export async function getProductDetails(productId) {
  try {
    return await window.canister.marketplace.getProductDetails(productId);
  } catch (err) {
    console.log(err, 'Error fetching product details')
    return [];
  }
}

export async function getShipmentDetails(shipmentId) {
  try {
    return await window.canister.marketplace.getShipmentDetails(shipmentId);
  } catch (err) {
    console.error("Error fetching shipment details:", err);
    return [];
  }
}

export async function getProductCount() {
  try {
    return await window.canister.marketplace.getProductCount();
  } catch (err) {
    console.error("Error fetching product count:", err);
  }
}

export async function getShipmentCount() {
    try {
      return await window.canister.marketplace.getShipmentCount();
    } catch (err) {
      console.error("Error fetching shipment count:", err);
    }
}

export async function updateProduct(productData) {
    try {
      return await window.canister.marketplace.updateProduct(productData);
    } catch (err) {
      console.error("Error updating product:", err);
    }
}

export async function cancelShipment(shipmentId) {
    try {
      return await window.canister.marketplace.cancelShipment(shipmentId);
    } catch (err) {
      console.error("Error cancelling shipment:", err);
    }
}





