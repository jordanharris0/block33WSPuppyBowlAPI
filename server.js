const express = require("express");
const app = express();
const prisma = require("./prisma");

const PORT = 3000;

//body-parsing middleware
app.use(express.json());
app.use(require("morgan")("dev"));

//GET
app.get("/api/players", async (req, res, next) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (error) {
    next(error);
  }
});

//POST
app.post("/api/players", async (req, res, next) => {
  try {
    const { name, breed, status } = req.body;
    const player = await prisma.player.create({
      data: { name, breed, status },
    });
    res.json(player);
  } catch (error) {
    next(error);
  }
});

//GET by ID
app.get("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.prisma.id;
    const player = await prisma.player.findUnique({ where: { id } });
    res.json(player);
  } catch (error) {
    next(error);
  }
});

//UPDATE
app.put("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const { status } = req.body;
    const player = await prisma.player.update({
      where: { id },
      data: { status },
    });
    res.json(player);
  } catch (error) {
    next(error);
  }
});

//DELETE
app.delete("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    await prisma.player.delete({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

//Simple error handling middleware
app.use((error, req, res, next) => {
  res.status(res.status || 500).send({ error: error });
});

//port listen
app.listen(PORT, () => console.log(`listening from port ${PORT}`));
