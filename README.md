# waka-fetch

waka-fetch is a small service that runs nightly to gather my coding statistics for the day from the [Wakatime API](https://wakatime.com/developers). The tool is serverless and is deployed on [Zeit Now](https://zeit.co/now).

<p align="center"><img src='images/waka-fetch.jpg'/></p>

This data will then be fed into [waka-machine](https://github.com/ckipp01/waka-machine) which will run it through a neural network and produce predictions on my coding activity for the coming week.
