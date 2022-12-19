import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/warehouseitems/count", async (request, response) => {
  const count = await prisma.warehouseItem.count();

  return response.json({ count });
});

app.get("/deliveryitems/count", async (request, response) => {
  const count = await prisma.deliveryItem.count();

  return response.json({ count });
});

app.get("/warehouseitems", async (request, response) => {
  const items = await prisma.warehouseItem.findMany();

  return response.json(items);
});

app.get("/deliveryitems", async (request, response) => {
  const items = await prisma.deliveryItem.findMany();

  return response.json(items);
});

app.post("/warehouseitems", async (request, response) => {
  const body = request.body;

  const item = await prisma.warehouseItem.create({
    data: {
      product: body.product,
      category: body.category,
      sku: body.sku,
      stock: body.stock,
      price: body.price,
      rating: body.rating,
    },
  });

  return response.status(201).json(item);
});

app.get("/warehouseitems/:id", async (request, response) => {
  const itemId = request.params.id;

  const item = await prisma.warehouseItem.findMany({
    select: {
      id: true,
      product: true,
      category: true,
      sku: true,
      stock: true,
      price: true,
      rating: true,

      createdAt: true,
    },
    where: {
      id: itemId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return response.json(item);
});

app.delete("/warehouseitems/:id", async (request, response) => {
  const itemId = request.params.id;
  const deleteItem = await prisma.warehouseItem.delete({
    where: {
      id: itemId,
    },
  });
});

app.post("/deliveryitems", async (request, response) => {
  //const itemId = request.params.id;
  const body = request.body;

  const item = await prisma.deliveryItem.create({
    data: {
      //id: itemId,
      carNumber: body.carNumber,
      dateTime: body.dateTime,
      tu: body.tu,
      carrier: body.carrier,
      shipTo: body.shipTo,
      weight: body.weight,
      numberOfItems: body.numberOfItems,
      pickingStatus: body.pickingStatus,
    },
  });

  return response.status(201).json(item);
});

app.get("/deliveryitems/:id", async (request, response) => {
  const itemId = request.params.id;

  const item = await prisma.deliveryItem.findMany({
    select: {
      carNumber: true,
      dateTime: true,
      tu: true,
      carrier: true,
      shipTo: true,
      weight: true,
      numberOfItems: true,
      pickingStatus: true,
      createdAt: true,
    },
    where: {
      id: itemId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return response.json(item);
});

app.delete("/deliveryitems/:id", async (request, response) => {
  const itemId = request.params.id;
  const deleteItem = await prisma.deliveryItem.delete({
    where: {
      id: itemId,
    },
  });
});

app.put("/warehouseitems/:id", async (request, response) => {
  const itemId = request.params.id;
  const body = request.body;

  const updateItem = await prisma.warehouseItem.update({
    where: {
      id: itemId,
    },
    data: {
      product: body.product,
      category: body.category,
      sku: body.sku,
      stock: body.stock,
      price: body.price,
      rating: body.rating,
    },
  });
});

app.listen(4000);
