
export function innerHtml(content = '') {
    content = _lines(content);
    content = _template(content);
    content = _bold(content);
    content = _color(content);
    content = _link(content);
    return content;
}

function _link(content) {
    if (!/\[(.*?)\]\((.*?)\)/gm.test(content)) return content;
    const ref = content.match(/\[(.*?)\]\((.*?)\)/gm) || [];
    ref.forEach((ref) => {
        const title = ref.match(/(?<=\[)(.*?)(?=\])/gm)[0];
        const link = ref.match(/(?<=\()(.*?)(?=\))/gm)[0];
        content = content.replace(
            ref,
            `<a data-link="${encodeURIComponent(link)}" title="${title}">${title}</a>`
        );
    });
    return content;
}

function _color(content) {
    if (!/\[(.*?)\]\[(.*?)\]/gm.test(content)) return content;
    const color = content.match(/\[(.*?)\]\[(.*?)\]/gm) || [];
    color.forEach((part) => {
        const split = part.match(/(?<=\[)(.*?)(?=\])/gm)
        content = content.replace(
            part,
            `<span style="color:${split[1]}">${split[0]}</span>`
        );
    });
    return content;
}

function _bold(content, spanClassName = "bold") {
    if (!/(?<=\*{2})(.*?)(?=\*{2})/gm.test(content)) return content;
    const bold = content.match(/(?<=\*{2})(.*?)(?=\*{2})/gm) || [];
    bold.forEach(
        (bold) =>
        (content = content.replace(
            `**${bold}**`,
            `<span class="${spanClassName}">${bold}</span>`
        ))
    );
    return content;
}

function _lines(str) {
    // str = str.split("\n\n").map((section) => `<section>${section}</section>`).join("");
    str = str.split("\n")
        .map((line) => {
            if (line === "---") return `<hr/>`;
            if (line.slice(0, 3) === "###") return `<h3>${line.slice(3)}</h3>`;
            if (line.slice(0, 2) === "##") return `<h2>${line.slice(2)}</h2>`;
            if (line.slice(0, 1) === "#") return `<h1>${line.slice(1)}</h1>`;
            if (line.slice(0, 2) === "||" || line.slice(0, 2) === "<<") return line;
            return line ? `<p>${line}</p>` : '';
        }).join("");
    return str;
}

function _template(str) {
    const template = {
        h: '<h{{$1}}>{{$2}}</h{{$1}}>',
        link: '<a data-link="{{$2}}">{{$1}}</a>',
        img: `<section class="gallery">{{<img data-link="url=$$" src="$$" />}}</section>`,
        youtube: '<iframe class="youtubePlayer" frameboarder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" src="https://www.youtube.com/embed/{{$1}}?rel=0&modestbranding=0&autohide=1&showinfo=0&loop=1" width="100%"></iframe>',
        ul: '<ul>{{<li>$$</li>}}</ul>',
        ol: '<ol>{{<li>$$</li>}}</ol>',
        table: '<section class="grid" style="grid-template-columns: repeat({{#1}}, 1fr)">{{<div>$$</div>}}</section>'
    };
    for (const key in template) {
        const re = new RegExp(`(?<=\\<{2})\\b${key}:((?!<|>).*?)(?=\\>{2})`, "gm");
        const matchs = str.match(re) || [];
        const dynVar = template[key].match(/(?<=\{{2})(.*?)(?=\}{2})/gm) || [];
        if (!dynVar.length) continue;
        matchs.forEach((exp) => {
            let content = template[key];
            const dynLines = [];
            const expSplited = exp.slice(key.length + 1).split('||');
            if (content.includes("$$") && content.includes("#1") && isNaN(expSplited[0])) expSplited.unshift(Math.min(3, expSplited.length));
            expSplited.forEach((val, idx) => {
                val = _bold(val);
                val = _color(val);
                val = _link(val);
                if (val) {
                    if (content.includes("$$") && !content.includes(`#${idx + 1}`)) {
                        let indexed = dynVar[dynVar.length - 1].replaceAll('$$', val);
                        const url = indexed.match(/(((?<=\burl=)\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g);
                        if (url) indexed = indexed.replace(`url=${url[0]}`, encodeURIComponent(url[0]));
                        dynLines.push(indexed);
                    } else if (content.includes(`#${idx + 1}`)) content = content.replace(`{{#${idx + 1}}}`, val);
                    else {
                        content = content.replaceAll(`{{$${idx + 1}}}`, val);
                        const url = content.match(/(((?<=\burl=)\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g);
                        if (url) content = content.replace(`url=${url[0]}`, encodeURIComponent(url[0]));
                    };
                }
            });
            if (dynLines.length)
                content = content.replace(`{{${dynVar[dynVar.length - 1]}}}`, dynLines.join(""));
            str = str.replace(`<<${exp}>>`, dynLines.length === 1 ? dynLines[0] : content);
        });
    }
    return str;
}

function _function(str) {

}

// <ul:First||Second||3rd>>