'use server';
// import { PrismaClient } from "@prisma/client";
import { prisma } from '@/db/prisma'
import { convertToPlainObject, formatError } from "../utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { revalidatePath } from 'next/cache';
import { insertProductSchema, updateProductSchema } from '../validators';
import { z } from 'zod';

// Get latest products
export async function getLatestProducts() {
    // const prisma = new PrismaClient();

    const data = await prisma.product.findMany({

        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc'}
    });

    return convertToPlainObject(data);
}

//Get single product by slug
export async function getProductBySlug(slug: string){
    return await prisma.product.findFirst({
        where : { slug: slug },
    });
}

//Get single product by its ID
export async function getProductById(productId: string){
    const data = prisma.product.findFirst({
        where : { id: productId },
    });

    return (convertToPlainObject(data))
}

//Get all products
export async function getAllProducts({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query,
    limit = PAGE_SIZE,
    page,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    category
}:{
    query: string;
    limit?: number;
    page: number;
    category?: string
}) {
    const data = await prisma.product.findMany({
        orderBy: {createdAt: 'desc'},
        skip: (page - 1) * limit,
        take: limit
    });

    const dataCount = await prisma.product.count();

    return({
        data,
        totalPages: Math.ceil(dataCount / limit),
    })
}

//Delete a Product
export async function deleteProduct (id: string) {
    try {
        const productExists = await prisma.product.findFirst({
            where: {id},
        });

        if(!productExists) throw new Error('Product does not exist')

        await prisma.product.delete({ where: {id} });

        revalidatePath('/admin/products');
        return {
            success: true,
            message: 'Product created successfully',
          };
        
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
        
    }
}

//Create a product
export async function createProduct(data: z.infer<typeof insertProductSchema>){
    try {
        const product = insertProductSchema.parse(data);
        await prisma.product.create({data: product})

        revalidatePath('/admin/products');

        return {
            success: true,
            message: 'Product created successfully',
        }
    } catch (error) {
        return{
            success: false,
            message: formatError(error)
        }
    }
}

//Update a product
export async function updateProduct(data: z.infer<typeof updateProductSchema>){
    try {
        const product = updateProductSchema.parse(data);
        const productExists = await prisma.product.findFirst({
            where: {id: product.id}
        });

        if (!productExists) throw new Error('Product not found')

        await prisma.product.update({
            where: {id: product.id },
            data: product,
        })

        revalidatePath('/admin/products');

        return {
            success: true,
            message: 'Product created successfully',
        }
    } catch (error) {
        return{
            success: false,
            message: formatError(error)
        }
    }
}