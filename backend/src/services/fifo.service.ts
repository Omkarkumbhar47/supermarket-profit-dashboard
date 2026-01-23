import { prisma } from "../prisma/client";

export async function consumeInventoryFIFO(
  productId: string,
  quantityToSell: number
) {
  const lots = await prisma.inventoryLot.findMany({
    where: {
      productId,
      remaining: { gt: 0 },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let remainingQty = quantityToSell;

  for (const lot of lots) {
    if (remainingQty <= 0) break;

    const deductQty = Math.min(lot.remaining, remainingQty);

    await prisma.inventoryLot.update({
      where: { id: lot.id },
      data: {
        remaining: lot.remaining - deductQty,
      },
    });

    remainingQty -= deductQty;
  }

  if (remainingQty > 0) {
    throw new Error("Insufficient inventory");
  }
}
