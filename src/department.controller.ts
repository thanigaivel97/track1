import { Request, Response, Router } from "express";

import { DepartmentService } from "./services/department.service";
const amqp = require('amqplib/callback_api');

export class DepartmentController {
  public router = Router();

  constructor(private departmentService: DepartmentService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.sayHello).post(this.add);

    this.router.route("/all").get(this.findAll);

    this.router.route("/:id").delete(this.delete).put(this.update);

    this.router.route("/get-notification").get(this.receiveDepartmentNotification)
  }

  private sayHello = (_: Request, res: Response) => {
    const welcomeMessage = this.departmentService.welcomeMessage();
    res.send(welcomeMessage);
  };

  private findAll = async (_: Request, res: Response) => {
    try {
      const pokemon = await this.departmentService.findAll();
      res.send(pokemon);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
  private sendMessagetoQueue = async (msg: string, queueName: string) => {
    amqp.connect('amqp://localhost', (connError: any, connection: any) => {
      if (connError) {
        throw connError;
      }
      // Step 2: Create Channel
      connection.createChannel((channelError: any, channel: any) => {
        if (channelError) {
          throw channelError;
        }
        // Step 3: Assert Queue
        const QUEUE = queueName
        channel.assertQueue(QUEUE);
        // Step 4: Send message to queue
        channel.sendToQueue(QUEUE, Buffer.from(msg));
        console.log(`Message send ${QUEUE}`);
      })
    })
  }


  private receiveDepartmentNotification = (req: Request, res: Response) => {
    try {

      //  Create Connection
      let msgRsponse = null
      amqp.connect('amqp://localhost', (connError: any, connection: any) => {
        if (connError) {
          throw connError;
        }
        //  Create Channel
        connection.createChannel((channelError: any, channel: any) => {
          if (channelError) {
            throw channelError;
          }
          //  Assert Queue
          const QUEUE = 'updating'
          channel.assertQueue(QUEUE);
          //  Receive Messages
          channel.consume(QUEUE, (msg: any) => {

            msgRsponse = msg
            const strin = JSON.parse(JSON.stringify(msg.content.toString()))
            msgRsponse = strin

            // setTimeout(function () {
            //   console.log(" [x] Done" , strin);
            //   channel.ack("msg");
            // }, 5000);
            if (msgRsponse) {
              return res.json(msgRsponse);
            } else {
              res.status(404).send(`No msg found`);
            }
          }, {
            noAck: true
          })
        })
      })

    } catch (error) {
      res.status(500).send(error.message);

    }
  }




  private add = async (req: Request, res: Response) => {
    try {
      const addPokemonResult = await this.departmentService.add(req.body);
      res.send(addPokemonResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  private delete = async (req: Request, res: Response) => {
    try {
      const deletePokemonResult = await this.departmentService.delete(
        req.params.id
      );
        res.send(deletePokemonResult);
    } catch (e) {
      res.status(500).send(e.message);
      
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      const updatePokemonResult = await this.departmentService.update(
        req.params.id,
        req.body
      );
      await this.sendMessagetoQueue(JSON.stringify(updatePokemonResult), 'updating')
      res.send(updatePokemonResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}
