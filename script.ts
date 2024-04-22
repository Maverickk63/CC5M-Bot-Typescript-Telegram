import { PrismaClient } from "@prisma/client";
import TelegramBot from "node-telegram-bot-api";

const prisma = new PrismaClient()
const bot = new TelegramBot('Token', {polling: true})

async function criarNovoUserEmail(email: string) {
    try {
      // Use o método create do Prisma para criar salvar o email
      const novoUserEmail = await prisma.userEmail.create({
        data: {
          email: email,
        },
      });
      console.log('Novo userEmail criado:', novoUserEmail);
    } catch (error) {
      console.error('Erro ao criar novo userEmail:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  let state = 0
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
  const timeUnix = msg.date
  // Converte unix para date
  var date = new Date(timeUnix * 1000);
  // Pega hora
  var hora = date.getHours();
  console.log(msg)
  if(state == 0)// state = zero significa q n barraram o cara
  {
      if(hora >= 9 && hora < 18) // se entre 9h as 18h
      {
        bot.sendMessage(chatId, 'https://uvv.br');
      }
      else
      {
          bot.sendMessage(chatId, 'A empresa so funciona entre as 9h as 18h por favor nos envie seu email para entramos em contato');
          state = 1 //Muda o estado pq significa que o cara foi barrado
      }
  }
  else if(state == 1)// state = 1 signfica que o cara foi barrado
  {
    state = 0
    let x = msg.text!
    criarNovoUserEmail(x) //função para salvar email
    bot.sendMessage(chatId, 'email salvo , entraremos em contato');
  }
  });