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

    for (let i = 0; i < productAssignmentData.length; i++) {
        const assignment = productAssignmentData[i];
        const charge = productChargesMap.get(assignment.id);
        resultMouldData.set(assignment.reservation_uuid, [
            {
                productId: assignment.id,
                productName: assignment.name,
                productStatus: charge ? charge.active : undefined,
                productCost: charge ? charge.amount : undefined,
            },
        ]);
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