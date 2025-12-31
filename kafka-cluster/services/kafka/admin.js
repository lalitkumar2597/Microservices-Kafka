import { Kafka, logLevel } from "kafkajs"

const kafka = new Kafka({
  clientId: "kafka-service",
  brokers: [
    "localhost:9094",
    "localhost:9095",
    "localhost:9096"
  ],
  logLevel: logLevel.ERROR
})

const admin = kafka.admin()

async function run() {
  try {
    await admin.connect()

    await admin.createTopics({
      waitForLeaders: true,
      topics: [
        {
          topic: "payment-successful",
          numPartitions: 3,
          replicationFactor: 3
        },
        {
          topic: "order-successful",
          numPartitions: 3,
          replicationFactor: 3
        },
        {
          topic: "email-successful",
          numPartitions: 3,
          replicationFactor: 3
        }
      ]
    })

    console.log("Topics created successfully")
  } catch (err) {
    console.error("Kafka admin error:", err)
  } finally {
    await admin.disconnect()
  }
}

run()
