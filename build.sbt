name := "waka-fetch"

description := "the fetching engine of daily waka-time summaries for ándaga"

scalaVersion := "2.12.8"

libraryDependencies ++= Seq(
  "com.github.scopt" %% "scopt" % "3.7.1",
  "org.scalaj" %% "scalaj-http" % "2.4.1"
)
