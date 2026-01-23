import { prisma } from "../prisma/client";

export async function getItemWiseProfit() {
  const products = await prisma.product.findMany({
    include: {
      sales: true,
      lots: true,
    },
  });

  return products.map((product) => {
    let revenue = 0;
    let cost = 0;

    for (const sale of product.sales) {
      revenue += sale.quantitySold * Number(sale.sellingPrice);
    }

    for (const lot of product.lots) {
      const consumed = lot.quantity - lot.remaining;
      cost += consumed * Number(lot.buyingPrice);
    }

    return {
      itemCode: product.itemCode,
      revenue,
      cost,
      profit: revenue - cost,
    };
  });
}
