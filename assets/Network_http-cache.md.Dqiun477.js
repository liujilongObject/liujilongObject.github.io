import{_ as e,c as a,o as i,a2 as t}from"./chunks/framework.Bk-UhgEh.js";const o="/assets/first-request.myQKqGbu.png",r="/assets/cache-request.COlgbOqp.png",b=JSON.parse('{"title":"HTTP缓存","description":"","frontmatter":{"categories":["Posts"],"tags":["网络"],"date":"2021-1-3"},"headers":[],"relativePath":"Network/http-cache.md","filePath":"Network/http-cache.md","lastUpdated":1709028643000}'),s={name:"Network/http-cache.md"},l=t('<h1 id="http缓存" tabindex="-1">HTTP缓存 <a class="header-anchor" href="#http缓存" aria-label="Permalink to &quot;HTTP缓存&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><strong>浏览器在发起HTTP请求时，会对请求的静态文件进行缓存，缓存主要分为两种：强缓存、协商缓存。</strong></p></div><h2 id="缓存规则" tabindex="-1">缓存规则 <a class="header-anchor" href="#缓存规则" aria-label="Permalink to &quot;缓存规则&quot;">​</a></h2><p><strong>在浏览器第一次请求数据时，缓存中没有对应的缓存数据，需要请求服务器，服务器返回后，将数据存储在缓存中。</strong><img src="'+o+'" alt="第一次请求"></p><p><strong>在后续请求时，则根据是否需要向服务器重新发起HTTP请求将缓存过程分为强缓存和协商缓存两部分。</strong></p><h3 id="强缓存-优先级高于协商缓存" tabindex="-1"><strong>强缓存（优先级高于协商缓存）</strong> <a class="header-anchor" href="#强缓存-优先级高于协商缓存" aria-label="Permalink to &quot;**强缓存（优先级高于协商缓存）**&quot;">​</a></h3><h4 id="相关response-header" tabindex="-1">相关Response Header <a class="header-anchor" href="#相关response-header" aria-label="Permalink to &quot;相关Response Header&quot;">​</a></h4><h4 id="expire" tabindex="-1">Expire <a class="header-anchor" href="#expire" aria-label="Permalink to &quot;Expire&quot;">​</a></h4><p><code>Expires: Tue, 01 Oct 2030 00:58:41 GMT</code>，Expires是<strong>HTTP/1.0</strong>控制缓存的字段，值为服务端返回的到期时间；如果下一次请求时请求时间小于服务端返回的到期时间，直接使用缓存数据。</p><p>到了HTTP/1.1，Expires已经被Cache-Control替代；由于Expires控制缓存的原理是使用客户端的时间与服务端返回的时间做对比，如果客户端与服务端的时间由于某些原因（时区不同；客户端和服务端有一方的时间不准确）发生误差，那么强缓存会直接失效。</p><h4 id="cache-control" tabindex="-1">Cache-Control <a class="header-anchor" href="#cache-control" aria-label="Permalink to &quot;Cache-Control&quot;">​</a></h4><p>在<strong>HTTP/1.1</strong>中，Cache-Control 是控制缓存最重要的规则；其常见取值如下：</p><ul><li>public：所有内容都将被缓存（客户端和代理服务器都可缓存）</li><li>private：所有内容只有客户端可以缓存，Cache-Control的默认取值</li><li>max-age=xxx：缓存内容将在xxx秒后失效</li><li>no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定</li><li>no-store：所有内容都不会被缓存，即不使用强缓存也不使用协商缓存</li></ul><p><strong>tip: 当两者同时存在时，Cache-Control优先级高于Expires。</strong></p><h3 id="协商缓存" tabindex="-1"><strong>协商缓存</strong> <a class="header-anchor" href="#协商缓存" aria-label="Permalink to &quot;**协商缓存**&quot;">​</a></h3><h4 id="相关header" tabindex="-1">相关header <a class="header-anchor" href="#相关header" aria-label="Permalink to &quot;相关header&quot;">​</a></h4><h4 id="last-modified-if-modified-since" tabindex="-1">Last-Modified/If-Modified-Since <a class="header-anchor" href="#last-modified-if-modified-since" aria-label="Permalink to &quot;Last-Modified/If-Modified-Since&quot;">​</a></h4><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Last-Modified是服务器在响应请求时，告诉浏览器资源的最后修改时间，在response header里返回；同时浏览器会将这个值保存起来，再次发起请求时会将If-Modified-Since在request header里带上。</p></div><p><strong>服务器收到请求后发现有If-Modified-Since，则与被请求资源的最后修改时间进行对比：</strong></p><ul><li>若资源的最后修改时间大于If-Modified-Since，说明资源被改动，则响应全部资源内容，返回状态码200。</li><li>若资源的最后修改时间小于或等于If-Modified-Since，说明资源没有被修改，则返回状态码304（不会响应资源内容），告知浏览器继续使用缓存。</li></ul><p><strong>缺点：</strong></p><ul><li>负载均衡的服务器，各个服务器生成的Last-Modified可能有所不同</li><li>GMT 格式有最小单位，如果在一秒内资源有更改将不能被识别</li></ul><h4 id="etag-if-none-match-优先级高于-last-modified-if-modified-since" tabindex="-1">ETag/If-None-Match（优先级高于 Last-Modified/If-Modified-Since） <a class="header-anchor" href="#etag-if-none-match-优先级高于-last-modified-if-modified-since" aria-label="Permalink to &quot;ETag/If-None-Match（优先级高于 Last-Modified/If-Modified-Since）&quot;">​</a></h4><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Etag是服务器响应请求时，返回当前资源文件的一个唯一标识序列，当资源有变化时，Etag就会重新生成； If-None-Match是浏览器再次发起请求时会带上的请求头。</p></div><p><strong>服务器收到请求后的具体流程与Last-Modified/If-Modified-Since类似</strong></p><p><strong>缺点：</strong></p><ul><li>ETag的生成需要消耗一定时间，效率不及前一种方法</li></ul><h2 id="用户行为对缓存的影响" tabindex="-1">用户行为对缓存的影响 <a class="header-anchor" href="#用户行为对缓存的影响" aria-label="Permalink to &quot;用户行为对缓存的影响&quot;">​</a></h2><ul><li>F5刷新：浏览器会设置max-age=0，跳过强缓存判断，会直接进行协商缓存判断。</li><li>ctrl+F5强制刷新：跳过强缓存和协商缓存，直接从服务器拉取资源。</li></ul><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ul><li><p>强缓存优先于协商缓存进行，若强缓存生效则直接使用缓存，若不生效则进行协商缓存。</p></li><li><p>协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，重新获取请求结果，再存入浏览器缓存中；生效则返回304，继续使用缓存。</p></li><li><p><strong>浏览器再次发起请求时：</strong></p></li></ul><p><img src="'+r+'" alt="浏览器再次发起请求时"></p>',32),n=[l];function d(c,h,p,f,u,m){return i(),a("div",null,n)}const x=e(s,[["render",d]]);export{b as __pageData,x as default};
