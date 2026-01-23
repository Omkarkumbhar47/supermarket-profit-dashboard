import { prisma } from "../prisma/client";

export async function getDashboardSummary() {
  const sales = await prisma.sale.findMany({
    include: {
      product: true,
    },
  });

  let totalRevenue = 0;
  let totalItemsSold = 0;

  for (const sale of sales) {
    totalRevenue += sale.quantitySold * Number(sale.sellingPrice);
    totalItemsSold += sale.quantitySold;
  }

  const lots = await prisma.inventoryLot.findMany();

  let totalCost = 0;

  for (const lot of lots) {
    const consumed = lot.quantity - lot.remaining;
    totalCost += consumed * Number(lot.buyingPrice);
  }

  return {
    totalRevenue,
    totalCost,
    totalProfit: totalRevenue - totalCost,
    itemsSold: totalItemsSold,
  };
}
