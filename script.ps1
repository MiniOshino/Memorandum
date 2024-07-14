Get-ChildItem "src\components" | 
Foreach-Object {
    # .\script.ps1  (to start the script)
    # $env:CLOUDFLARE_API_TOKEN="CODE[s]"
    # echo $_.FullName 
    echo $_.Name
    $var1 = $_.Name
    $var2 = $_.FullName
    # echo $var1 $var2
    npx wrangler r2 object put beans/$var1 --file=$var2
};