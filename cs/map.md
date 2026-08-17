# 地图

- [Natural Earth is a public domain map dataset available at 1:10m, 1:50m, and 1:110 million scales. ](https://www.naturalearthdata.com/)

<details>
<summary>country code</summary>

## [Comprehensive country code information, including ISO 3166 codes, ITU dialing codes, ISO 4217 currency codes, and many others](https://datahub.io/core/country-codes)
- [github](https://github.com/datasets/country-codes)

</details>

<details>
<summary>GeoJSON</summary>

GeoJSON 是一种基于 JSON（JavaScript Object Notation）的地理空间数据交换格式，用于编码各种地理数据结构，目前已被广泛接受为标准格式（尤其是 Web 地图和 GIS 领域）。

[RFC 7946: The GeoJSON Format](https://www.rfc-editor.org/info/rfc7946/)

[知乎上的一篇翻译](https://zhuanlan.zhihu.com/p/141554586)

[asia下载的数据来源](https://img.hcharts.cn/mapdata/)

```shell
# 这里下载的，目前是没有GeoJSON的meta数据，不清楚如何转换
// geo的数据
// https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json
// GeoJSON格式

// https://geojson.cn/data/atlas/china数据解析时会出现两个问题
// 数据中加入了最大的边界值，即地图的边界值，

# asia
带有GeoJson的meta信息
curl -O https://img.hcharts.cn/mapdata/custom/asia.geo.json

```

</details>