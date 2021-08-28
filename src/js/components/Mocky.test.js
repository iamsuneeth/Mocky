const rewire = require("rewire")
const Mocky = rewire("./Mocky")
const createListener = Mocky.__get__("createListener")
const createClosure = Mocky.__get__("createClosure")
const isAPIRequestWithURL = Mocky.__get__("isAPIRequestWithURL")
// @ponicode
describe("createListener", () => {
    test("0", () => {
        let callFunction = () => {
            createListener("callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            createListener(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("createClosure", () => {
    test("0", () => {
        let callFunction = () => {
            createClosure("www.google.com", "https://accounts.google.com/o/oauth2/revoke?token=%s", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            createClosure("https://twitter.com/path?abc", "https://", "http://base.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            createClosure("https://twitter.com/path?abc", "Www.GooGle.com", "http://base.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            createClosure("ponicode.com", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", "https://accounts.google.com/o/oauth2/revoke?token=%s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            createClosure("https://twitter.com/path?abc", "https://twitter.com/path?abc", "https://accounts.google.com/o/oauth2/revoke?token=%s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            createClosure(undefined, "", undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isAPIRequestWithURL", () => {
    test("0", () => {
        let param1 = ["POST", { User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", Accept-Language: "en-US,en;q=0.5", Connection: "keep-alive", Upgrade-Insecure-Requests: 1, Pragma: "no-cache", Cache-Control: "no-cache" }, { Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", Accept-Encoding: "gzip, deflate", Accept-Language: "en-GB,en-US;q=0.9,en;q=0.8", Dnt: 1, Host: "httpbin.org", Upgrade-Insecure-Requests: 1, User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36" }, { Accept: "*/*", Accept-Encoding: "gzip, deflate", Host: "httpbin.org", User-Agent: "Chrome/83.0.4103.97 Safari/537.36", X-Amzn-Trace-Id: "Root=1-5ee7b614-d1d9a6e8106184eb3d66b108" }]
        let callFunction = () => {
            isAPIRequestWithURL(param1, "Www.GooGle.com", "Www.GooGle.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param1 = ["POST", { User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", Accept-Language: "en-US,en;q=0.5", Connection: "keep-alive", Upgrade-Insecure-Requests: 1, Pragma: "no-cache", Cache-Control: "no-cache" }, { User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", Accept-Language: "en-US,en;q=0.5", Connection: "keep-alive", Upgrade-Insecure-Requests: 1, Pragma: "no-cache", Cache-Control: "no-cache" }, { Accept: "*/*", Accept-Encoding: "gzip, deflate", Host: "httpbin.org", User-Agent: "Chrome/83.0.4103.97 Safari/537.36", X-Amzn-Trace-Id: "Root=1-5ee7b614-d1d9a6e8106184eb3d66b108" }]
        let callFunction = () => {
            isAPIRequestWithURL(param1, "https://croplands.org/app/a/confirm?t=", "https://croplands.org/app/a/confirm?t=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1 = [{ Accept: "*/*", Accept-Encoding: "gzip, deflate", Host: "httpbin.org", User-Agent: "Chrome/83.0.4103.97 Safari/537.36", X-Amzn-Trace-Id: "Root=1-5ee7b614-d1d9a6e8106184eb3d66b108" }, { Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", Accept-Encoding: "gzip, deflate", Accept-Language: "en-GB,en-US;q=0.9,en;q=0.8", Dnt: 1, Host: "httpbin.org", Upgrade-Insecure-Requests: 1, User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36" }, { User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", Accept-Language: "en-US,en;q=0.5", Connection: "keep-alive", Upgrade-Insecure-Requests: 1, Pragma: "no-cache", Cache-Control: "no-cache" }, { Accept: "*/*", Accept-Encoding: "gzip, deflate", Host: "httpbin.org", User-Agent: "Chrome/83.0.4103.97 Safari/537.36", X-Amzn-Trace-Id: "Root=1-5ee7b614-d1d9a6e8106184eb3d66b108" }]
        let callFunction = () => {
            isAPIRequestWithURL(param1, "http://www.croplands.org/account/confirm?t=", "https://twitter.com/path?abc")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param1 = ["DELETE", { Accept: "*/*", Accept-Encoding: "gzip, deflate", Host: "httpbin.org", User-Agent: "Chrome/83.0.4103.97 Safari/537.36", X-Amzn-Trace-Id: "Root=1-5ee7b614-d1d9a6e8106184eb3d66b108" }, { Accept: "*/*", Accept-Encoding: "gzip, deflate", Host: "httpbin.org", User-Agent: "Chrome/83.0.4103.97 Safari/537.36", X-Amzn-Trace-Id: "Root=1-5ee7b614-d1d9a6e8106184eb3d66b108" }, "DELETE"]
        let callFunction = () => {
            isAPIRequestWithURL(param1, "ponicode.com", "ponicode.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1 = [{ Accept: "*/*", Accept-Encoding: "gzip, deflate", Host: "httpbin.org", User-Agent: "Chrome/83.0.4103.97 Safari/537.36", X-Amzn-Trace-Id: "Root=1-5ee7b614-d1d9a6e8106184eb3d66b108" }, { User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", Accept-Language: "en-US,en;q=0.5", Connection: "keep-alive", Upgrade-Insecure-Requests: 1, Pragma: "no-cache", Cache-Control: "no-cache" }, "POST", "POST"]
        let callFunction = () => {
            isAPIRequestWithURL(param1, "https://twitter.com/path?abc", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            isAPIRequestWithURL(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
