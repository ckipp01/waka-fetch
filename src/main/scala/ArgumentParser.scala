import java.io.File

object ArgumentParser {

  case class Config(
      user: String = "",
      apiKeyFile: ApiKeyFile = ApiKeyFile(new File(".")),
      startDate: String = "",
      endDate: String = "")

  def parse(args: Seq[String]): Option[ArgumentParser.Config] = parser.parse(args, Config())

  val parser = new scopt.OptionParser[Config]("waka-fetch") {
    head("waka-fetch")

    opt[String]('u', "user")
      .required
      .valueName("user")
      .action((u, c) => c.copy(user = u))

    opt[File]('l',"apiLocation")
      .required
      .valueName("Api Key Location")
      .action((f, c) => c.copy(apiKeyFile = ApiKeyFile(f)))

    opt[String]('s', "startDate")
      .required
      .valueName("Start Date")
      .action((sd, c) => c.copy(startDate = sd))

    opt[String]('e', "endDate")
      .required
      .valueName("End Date")
      .action((ed, c) => c.copy(endDate = ed))
  }
}
