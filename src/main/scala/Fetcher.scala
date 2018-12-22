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

    if (response.is2xx) {
      Some(response)
    } else {
      None
    }
  }
}
