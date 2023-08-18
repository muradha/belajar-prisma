import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/user", async (req, res) => {
	const allUsers = await prisma.user.findMany();
	res.json(allUsers);
});

app.post("/user", async (req, res) => {
	const newUser = await prisma.user.create({
		data: req.body,
	});
	res.json(newUser);
});

app.put("/:id", async (req, res) => {
	const id = req.params.id;
	const newAge = req.body.age;

	const updatedUser = await prisma.user.update({
		where: {
			id: parseInt(id),
		},
		data: {
			age: newAge,
		},
	});
	res.json(updatedUser);
});

app.delete("/:id", async (req, res) => {
	const id = req.params.id;

	const deletedUser = await prisma.user.delete({
		where: {
			id: parseInt(id),
		},
	});
	res.json(deletedUser);
});

app.post("/house", async (req, res) => {
	const newHouse = await prisma.house.create({
		data: req.body,
	});
	res.json(newHouse);
});

app.get("/house", async (req, res) => {
	const allHouse = await prisma.house.findMany({
		include: {
			owner: true,
			builtBy: true,
		},
	});
	res.json(allHouse);
});


app.get("/house/:id", async (req, res) => {
	const id = req.params.id;
	const allHouse = await prisma.house.findUnique({
		where: {
			id
		},
		include: {
			owner: true,
			builtBy: true,
		},
	});
	res.json(allHouse);
});

app.get("/house-by-address", async (req, res) => {
	const query = req.body.address;
	const allHouse = await prisma.house.findMany({
		where: {
			address: {
				contains: query
			}
		},
		include: {
			owner: true,
			builtBy: true,
		},
	});
	res.json(allHouse);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
