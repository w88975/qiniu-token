# qiniu-uptoken
不需要服务端 用原生js生成七牛(7牛)的uptoken.

## build

``` bash

npm install
gulp build

```

## test


``` html

<script type="text/javascript" src="bin/qiniu-token.min.js"></script>

<script>
    // initialize <初始化>
    qiniuToken.config.access_key = '<your qiniu access_key>';
    qiniuToken.config.secret_key = '<your qiniu secret_key>';
    qiniuToken.config.bucketname = '<your bucketname>';

    // generate uptoken <生成上传凭证(uptoken)>
    var token = qiniuToken.getToken();
</script>

```
