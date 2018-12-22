object Application {
  def main(args: Array[String]) : Unit = {
      ArgumentParser.parse(args) match {
        case Some(conf) =>
          val apiKey = conf.apiKeyFile.apiKey.split("=").last
          val response = Fetcher.fetch(conf.user, conf.startDate, conf.endDate, apiKey)
          response match {
            case Some(r) => println(r)
            case None => () // TODO figure out how to notify me if this fails
          }
        case None => ()
      }
  }
}

