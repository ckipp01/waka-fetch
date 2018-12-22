import java.io.File

import scala.io.Source

object Waka {
  val baseUrl : String = "https://wakatime.com/api/v1/users/"
  val summaries : String = "/summaries/"
  val startParam : String = "start"
  val endParam : String = "end"
  val apiKeyParam : String = "api_key"
}

case class ApiKeyFile(apiKeyFile : File) {
  def apiKey : String = Source.fromFile(apiKeyFile).getLines.toList.head
}

