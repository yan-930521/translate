/**
 * Copyright 2021 yan-930521  All Rights Reserved.
 */
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const { JSZhuyin } = require('jszhuyin');
const Data = require('./data.json');
var jszhuyin = new JSZhuyin();
jszhuyin.load();

var candidates = [];
jszhuyin.oncandidateschange = function(c) {
  candidates = c;
};

readline.question(`請輸入句子\n`, input => {
  let str = input.trim();
  let ans = "";
  for (let w in str) {
    ans += Data[str[w]] ? Data[str[w]] : str[w];
  }
  ans = ans.replace(/ˇ/g,"ˇ|").replace(/ˋ/g,"ˋ|").replace(/ˊ/g,"ˊ|").replace(/˙/g,"˙|").replace(/ /g," |").split('|');
  let c1 = ['ㄧ','ㄨ','ㄩ']
  let c2 = ['ㄚ','ㄛ','ㄜ','ㄝ','ㄞ','ㄟ','ㄠ','ㄡ','ㄢ','ㄣ','ㄤ','ㄥ']
  let c3 = ["ˇ","ˋ","ˊ","˙"," "];
  for(let a in ans) {
    let f = "";
    let m = "";
    let b = "";
    let so = "";
    for(let s in ans[a]) {
      if(ans[a][s].length > 4) continue;
      if(c1.includes(ans[a][s])) {
        m = ans[a][s];
      }
      if(c2.includes(ans[a][s])) {
        b = ans[a][s];
      }
      if(c3.includes(ans[a][s])) {
        so = ans[a][s];
      }
      if(!c1.includes(ans[a][s]) && !c2.includes(ans[a][s]) && !c3.includes(ans[a][s]) ) {
        f = ans[a][s];
      }
    }
    ans[a] = f+m+b+so;
  }
  ans = ans.join('').replace(/ /g,"");
  jszhuyin.handleKey(ans);
  let a = "翻譯結果：\n";
  if (candidates[0] && candidates[0][0]) {
    a += candidates[0][0] + "\n\n注音：" + ans ;
  } else {
    a += "查無此解\n\n注音：" + ans;
  }
  console.log(a);
  readline.close()
});