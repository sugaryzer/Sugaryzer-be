import { prisma } from "../lib/db";

export class productRepository {

    static async findProductByName(name: string) {
        return prisma.product.findFirst({
          where: {
            name,
        },
        });
    }

}