# Homework

请使用OWASP ZAP作为漏洞扫描工具，在你自己的本地开发环境中实现自动化的动态应用安全测试。可以使用OWASP JuiceShop作为含有安全漏洞的目标测试应用。不强制要求加入BDD测试框架。请提交以下作业：

1. 自动化动态应用安全测试的源代码或其截图，需要显示出源码调用了ZAP API。
2. 经过自动化动态应用安全测试后，通过调用ZAP API生成的扫描结果（通过调用ZAP htmlreport API而生成的HTML报告，或者通过调用ZAP alerts_summary API而获取到的关于目标测试网站的Alerts Summary数据）


[Juice Shop](https://juice-shop.herokuapp.com/)

[OWASP ZAP + nodejs](https://github.com/zaproxy/zap-api-nodejs)


docker run -v $(pwd):/zap/wrk/:rw -t owasp/zap2docker-stable zap-baseline.py -t https://juice-shop.herokuapp.com -g gen.conf -r testreport.html


test code in search-juiceshop.json

