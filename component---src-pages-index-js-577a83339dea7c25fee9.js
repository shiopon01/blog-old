"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[678],{8678:function(e,t,n){var a=n(7294),l=n(1082);t.Z=function(e){var t,n=e.location,r=e.title,i=e.children,o="/"===n.pathname;return t=o?a.createElement("h1",{className:"main-heading"},a.createElement(l.Link,{to:"/"},r)):a.createElement(l.Link,{className:"header-link-home",to:"/"},r),a.createElement("div",{className:"global-wrapper","data-is-root-path":o},a.createElement("header",{className:"global-header"},t),a.createElement("main",null,i),a.createElement("footer",null,"© 2022, shiopon01"))}},9357:function(e,t,n){var a=n(7294),l=n(1082),r=function(e){var t,n,r,i=e.description,o=(e.lang,e.title),c=e.children,m=(0,l.useStaticQuery)("2841359383").site,s=i||m.siteMetadata.description,d=null===(t=m.siteMetadata)||void 0===t?void 0:t.title,u=o?o+" | "+d:d;return a.createElement(a.Fragment,null,a.createElement("title",null,u),a.createElement("meta",{name:"description",content:s}),a.createElement("meta",{property:"og:title",content:o}),a.createElement("meta",{property:"og:description",content:s}),a.createElement("meta",{property:"og:type",content:"website"}),a.createElement("meta",{name:"twitter:card",content:"summary"}),a.createElement("meta",{name:"twitter:creator",content:(null===(n=m.siteMetadata)||void 0===n||null===(r=n.social)||void 0===r?void 0:r.twitter)||""}),a.createElement("meta",{name:"twitter:title",content:o}),a.createElement("meta",{name:"twitter:description",content:s}),c)};r.defaultProps={description:""},t.Z=r},6558:function(e,t,n){n.r(t),n.d(t,{Head:function(){return o}});var a=n(7294),l=n(1082),r=n(8678),i=n(9357);t.default=function(e){var t,n=e.data,i=e.location,o=(null===(t=n.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",c=n.allMarkdownRemark.nodes;return 0===c.length?a.createElement(r.Z,{location:i,title:o},a.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):a.createElement(r.Z,{location:i,title:o},a.createElement("ol",{style:{listStyle:"none"}},c.map((function(e){var t=e.frontmatter.title||e.fields.slug;return a.createElement("li",{key:e.fields.slug},a.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},a.createElement("header",null,a.createElement("h2",null,a.createElement(l.Link,{to:e.fields.slug,itemProp:"url"},a.createElement("span",{itemProp:"headline"},t))),a.createElement("small",null,e.frontmatter.createdDate)),a.createElement("section",null,a.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}))))};var o=function(){return a.createElement(i.Z,{title:""})}}}]);
//# sourceMappingURL=component---src-pages-index-js-577a83339dea7c25fee9.js.map