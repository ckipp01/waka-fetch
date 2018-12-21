object Application {
  def main(args: Array[String]): Unit = {
      ArgumentParser.parse(args) match {
        case None => ()
        case Some(conf) => println(conf)
      }
  }
}

