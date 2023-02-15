!function(){"use strict";var e=window.wp.element,t=window.wp.data,l=(window.wp.coreData,window.wp.mediaUtils),n=window.wp.components,a=(0,t.withSelect)(((e,t)=>{let{imageId:l}=t;const n=e("core").getMedia(l);if(n){const{id:e,alt_text:t,title:l,media_details:a}=n,{thumbnail:i}=a.sizes;return{image:{id:e,alt:t,title:l.rendered,url:i.source_url,height:i.height,width:i.width}}}return{image:null}}))((function(t){let{fieldKey:a,image:i}=t;const[r,o]=(0,e.useState)(null);return i&&!r&&o(i),(0,e.createElement)(e.Fragment,null,(0,e.createElement)("input",{label:"Watermark Image",name:a,type:"number",value:r?r.id:null,readonly:!0,hidden:!0}),r&&(0,e.createElement)("img",{src:r.url,alt:r.alt,title:r.title,height:r.height,width:r.width}),(0,e.createElement)(l.MediaUpload,{onSelect:e=>{let{id:t,alt:l,title:n,sizes:a}=e;const{thumbnail:i}=a;o({id:t,alt:l,title:n,url:i.url,height:i.height,width:i.width})},value:r?r.id:null,render:t=>{let{open:l}=t;return(0,e.createElement)(n.Button,{variant:"secondary",onClick:l},"Open Media Library")}}))}));const i=[{label:"Select a position",value:""},{label:"Center",value:15},{label:"Top",value:1},{label:"Bottom",value:2},{label:"Right",value:4},{label:"Left",value:8},{label:"Top Right",value:5},{label:"Bottom Right",value:6},{label:"Top Left",value:9},{label:"Bottom Left",value:10}];function r(t){let{fieldKey:l,position:a}=t;const[r,o]=(0,e.useState)(a);return(0,e.createElement)(n.SelectControl,{name:l,value:r,onChange:e=>o(e),options:i})}const o="image_watermark_settings";function u(){var l,n;const[i,u]=(0,e.useState)(null);return(0,t.useSelect)((e=>{const t=e("core").getEntityRecord("root","site");!i&&t&&t[o]&&u(t[o])})),(0,e.createElement)("table",{className:"form-table"},i&&(0,e.createElement)("tbody",null,(0,e.createElement)("tr",null,(0,e.createElement)("th",null,"Watermark Image"),(0,e.createElement)("td",{style:{display:"flex",flexDirection:"column",width:"fit-content"}},(0,e.createElement)(a,{imageId:null!==(l=i.image_id)&&void 0!==l?l:null,fieldKey:o+"[image_id]"}))),(0,e.createElement)("tr",null,(0,e.createElement)("th",null,"Position"),(0,e.createElement)("td",null,(0,e.createElement)(r,{position:null!==(n=i.position)&&void 0!==n?n:null,fieldKey:o+"[position]"})))))}addEventListener("DOMContentLoaded",(()=>{const t=document.getElementById("image-watermark");(0,e.render)((0,e.createElement)(u,null),t)}))}();