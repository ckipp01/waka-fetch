
object Application {
  def main(args: Array[String]) : Unit = {
      ArgumentParser.parse(args) match {
        case Some(conf) =>
          val apiKey = conf.apiKeyFile.apiKey.split("=").last
          val response = Fetcher.fetch(conf.user, conf.startDate, conf.endDate, apiKey)
          response match {
            case Some(r) => {
              r.code match {
                case 200 => Storage.storeRecord(r.body)
                case 400 => println(r.body)
                case 401 => println(r.body)
              }
            }
            case None => println("failed - no response") // TODO figure out how to notify me if this fails
          }
        case None => println("failed") // TODO Same as above, figure out how I want to be notified of these failures
      }
  }
}

