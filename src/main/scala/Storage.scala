
import Helpers._
import org.mongodb.scala.MongoClient
import org.mongodb.scala.MongoCollection
import org.mongodb.scala.MongoDatabase
import org.mongodb.scala.bson.collection.immutable.Document

object Storage {
  private def createDbConn(): MongoDatabase = {
    val connString = "mongodb://<user>:<password>@<host>:<port>/?authSource=<auth-db>"
    val mongoClient: MongoClient = MongoClient(connString)
    mongoClient.getDatabase("insert-name")
  }

  private def getCollection(db: MongoDatabase, name: String): MongoCollection[Document] = db.getCollection(name)

  def storeRecord(record: String)  = {
    val db = createDbConn()
    val col = getCollection(db, "db-name")
    val test = col.insertOne(Document(record)).results()
  }
}
