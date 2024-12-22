// map = {
//     reservationId -> product_assignment.reservation_uuid = [
//         {
//             productId: product_assignment.id,
//             productName: product_assignment.name,
//             productStatus: product_charges.active?,
//             productCost: product_charges.amount?
//         },
//         {
//             productId: product_assignment.id,
//             productName: product_assignment.name,
//             productStatus: product_charges.active?,
//             productCost: product_charges.amount?
//         }
//     ]
// }

const productAssignmentData = require('./MockedData/product_assignment.json');
const productChargesData = require('./MockedData/product_charges.json');


function mouldProductAssignmentData() {
    const resultMouldData = new Map();
    const productChargesMap = mapProductCharges();

    for (const assignment of productAssignmentData) {
        const charge = productChargesMap.get(assignment.id);
        const productData = {
            productId: assignment.id,
            productName: assignment.name,
            productStatus: charge?.active,
            productCost: charge?.amount,
        };
    
        if (resultMouldData.has(assignment.reservation_uuid)) {
            resultMouldData.get(assignment.reservation_uuid).push(productData);
        } else {
            resultMouldData.set(assignment.reservation_uuid, [productData]);
        }
    }
    return resultMouldData;
}


function mapProductCharges(){
    const productChargesMap = new Map(
        productChargesData.map(item => [item.special_product_assignment_id, item])
    );
    return productChargesMap;
}

module.exports = { mouldProductAssignmentData };
