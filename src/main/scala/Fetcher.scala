import scalaj.http.Http
import scalaj.http.HttpResponse

object Fetcher {
  def fetch(
      user : String,
      startDate : String,
      endDate : String,
      apiKey: String): Option[HttpResponse[String]] = {
    val response =
      Http(Waka.baseUrl + user + Waka.summaries)
        .params(Seq((Waka.startParam, startDate), (Waka.endParam, endDate), (Waka.apiKeyParam, apiKey))).asString

    println(response.code)
    response.code match {
      case 200 => Some(response)
      case 400 => Some(response)
      case _ => None
    }
  }
}
