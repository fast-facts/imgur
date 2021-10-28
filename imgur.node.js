!(function (e, t) {
  if ('object' == typeof exports && 'object' == typeof module)
    module.exports = t();
  else if ('function' == typeof define && define.amd) define([], t);
  else {
    var r = t();
    for (var o in r) ('object' == typeof exports ? exports : e)[o] = r[o];
  }
})(this, function () {
  return (() => {
    'use strict';
    var e = {
        907: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getAlbum = void 0);
          const o = r(80),
            s = r(571);
          t.getAlbum = async function (e, t) {
            const r = `${o.ALBUM_ENDPOINT}/${t}`;
            return s.getImgurApiResponseFromResponse(
              await e.request({ url: r })
            );
          };
        },
        639: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            r(780).__exportStar(r(907), t);
        },
        934: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.ImgurClient = void 0);
          const o = r(780),
            s = r(614),
            a = r(894),
            n = r(176),
            i = r(788),
            u = r(639),
            c = r(80),
            l = 'imgur/next (https://github.com/kaimallea/node-imgur)',
            d = o.__importDefault(r(376));
          class p extends s.EventEmitter {
            constructor(e) {
              super(),
                (this.credentials = e),
                (this.plainFetcher = d.default.create({
                  baseURL: c.IMGUR_API_PREFIX,
                  headers: { 'user-agent': l },
                  responseType: 'json',
                })),
                (this.fetcher = d.default.create({
                  baseURL: c.IMGUR_API_PREFIX,
                  headers: { 'user-agent': l },
                  responseType: 'json',
                })),
                this.fetcher.interceptors.request.use(
                  async (e) => (
                    (e.headers = e.headers ? e.headers : {}),
                    (e.headers.authorization = await a.getAuthorizationHeader(
                      this
                    )),
                    e
                  ),
                  (e) => Promise.reject(e)
                );
            }
            plainRequest(e) {
              return this.plainFetcher(e);
            }
            request(e = {}) {
              return this.fetcher(e);
            }
            deleteImage(e) {
              return n.deleteImage(this, e);
            }
            favoriteImage(e) {
              return n.favoriteImage(this, e);
            }
            getAlbum(e) {
              return u.getAlbum(this, e);
            }
            getGallery(e) {
              return i.getGallery(this, e);
            }
            getSubredditGallery(e) {
              return i.getSubredditGallery(this, e);
            }
            searchGallery(e) {
              return i.searchGallery(this, e);
            }
            getImage(e) {
              return n.getImage(this, e);
            }
            updateImage(e) {
              return n.updateImage(this, e);
            }
            upload(e) {
              return n.upload(this, e);
            }
          }
          t.ImgurClient = p;
        },
        80: (e, t) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.SEARCH_GALLERY_ENDPOINT = t.SUBREDDIT_GALLERY_ENDPOINT = t.GALLERY_ENDPOINT = t.UPLOAD_ENDPOINT = t.IMAGE_ENDPOINT = t.ALBUM_ENDPOINT = t.AUTHORIZE_ENDPOINT = t.API_VERSION = t.IMGUR_API_PREFIX = void 0),
            (t.IMGUR_API_PREFIX = 'https://api.imgur.com'),
            (t.API_VERSION = '3'),
            (t.AUTHORIZE_ENDPOINT = 'oauth2/authorize'),
            (t.ALBUM_ENDPOINT = `${t.API_VERSION}/album`),
            (t.IMAGE_ENDPOINT = `${t.API_VERSION}/image`),
            (t.UPLOAD_ENDPOINT = `${t.API_VERSION}/upload`),
            (t.GALLERY_ENDPOINT = `${t.API_VERSION}/gallery`),
            (t.SUBREDDIT_GALLERY_ENDPOINT = `${t.API_VERSION}/gallery/r`),
            (t.SEARCH_GALLERY_ENDPOINT = `${t.API_VERSION}/gallery/search`);
        },
        419: (e, t) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.isLogin = t.isClientId = t.isAccessToken = void 0),
            (t.isAccessToken = function (e) {
              return void 0 !== e.accessToken;
            }),
            (t.isClientId = function (e) {
              return void 0 !== e.clientId;
            }),
            (t.isLogin = function (e) {
              return (
                void 0 !== e.clientId &&
                void 0 !== e.username &&
                void 0 !== e.password
              );
            });
        },
        571: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getImgurApiResponseFromResponse = t.createForm = t.getSource = t.isStream = t.isImageUrl = t.isBase64 = void 0);
          const o = r(780).__importDefault(r(353));
          function s(e) {
            return (
              'string' != typeof e && void 0 !== e.base64 && 'base64' === e.type
            );
          }
          function a(e) {
            return 'string' != typeof e && void 0 !== e.stream;
          }
          (t.isBase64 = s),
            (t.isImageUrl = function (e) {
              return (
                'string' == typeof e || (void 0 !== e.image && 'url' === e.type)
              );
            }),
            (t.isStream = a),
            (t.getSource = function (e) {
              return 'string' == typeof e
                ? e
                : s(e)
                ? 'payload.base64'
                : a(e)
                ? 'payload.stream'
                : e.image;
            }),
            (t.createForm = function (e) {
              const t = new o.default();
              if ('string' == typeof e) return t.append('image', e), t;
              for (const [r, o] of Object.entries(e)) {
                const s = ['base64', 'stream'];
                -1 !== s.indexOf(r)
                  ? -1 !== s.indexOf(e.type) && t.append(r, e)
                  : t.append(r, o);
              }
              return t;
            }),
            (t.getImgurApiResponseFromResponse = function (e) {
              var t, r;
              return void 0 !==
                (null === (t = e.data) || void 0 === t ? void 0 : t.status) &&
                void 0 !==
                  (null === (r = e.data) || void 0 === r ? void 0 : r.success)
                ? e.data
                : { data: e.data, status: e.status, success: !0 };
            });
        },
        818: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getGallery = t.constructGalleryUrl = void 0);
          const o = r(80),
            s = r(835),
            a = r(571),
            n = { section: 'hot', sort: 'viral' };
          function i(e) {
            const t = Object.assign({}, n, e);
            let r = `${t.section}`;
            t.sort && (r += `/${t.sort}`),
              'top' === t.section && t.window && (r += `/${t.window}`),
              t.page && (r += `/${t.page}`);
            const a = new s.URL(
              `${o.IMGUR_API_PREFIX}/${o.GALLERY_ENDPOINT}/${r}`
            );
            return (
              void 0 !== t.showViral &&
                a.searchParams.append('showViral', t.showViral.toString()),
              void 0 !== t.mature &&
                a.searchParams.append('mature', t.mature.toString()),
              void 0 !== t.album_previews &&
                a.searchParams.append(
                  'album_previews',
                  t.album_previews.toString()
                ),
              a
            );
          }
          (t.constructGalleryUrl = i),
            (t.getGallery = async function (e, t = n) {
              const { pathname: r } = i(t),
                o = r.slice(1);
              return a.getImgurApiResponseFromResponse(
                await e.request({ url: o })
              );
            });
        },
        686: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getSubredditGallery = t.constructSubredditGalleryUrl = void 0);
          const o = r(80),
            s = r(835),
            a = r(571);
          function n(e) {
            let t = `${e.subreddit}`;
            return (
              e.sort && (t += `/${e.sort}`),
              'top' === e.sort && e.window && (t += `/${e.window}`),
              e.page && (t += `/${e.page}`),
              new s.URL(
                `${o.IMGUR_API_PREFIX}/${o.SUBREDDIT_GALLERY_ENDPOINT}/${t}`
              )
            );
          }
          (t.constructSubredditGalleryUrl = n),
            (t.getSubredditGallery = async function (e, t) {
              const { pathname: r } = n(t),
                o = r.slice(1);
              return a.getImgurApiResponseFromResponse(
                await e.request({ url: o })
              );
            });
        },
        788: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 });
          const o = r(780);
          o.__exportStar(r(818), t),
            o.__exportStar(r(686), t),
            o.__exportStar(r(477), t);
        },
        477: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.searchGallery = t.constructSearchGalleryUrl = void 0);
          const o = r(80),
            s = r(571),
            a = r(835),
            n = ['q_all', 'q_any', 'q_exactly', 'q_not', 'q_type', 'q_size_px'];
          function i(e) {
            let t = '';
            e.sort && (t += `/${e.sort}`),
              'top' === e.sort && e.window && (t += `/${e.window}`),
              e.page && (t += `/${e.page}`);
            const r = new a.URL(
              `${o.IMGUR_API_PREFIX}/${o.SEARCH_GALLERY_ENDPOINT}${t}`
            );
            if (
              (n.forEach((t) => {
                var o;
                (null === (o = e[t]) || void 0 === o ? void 0 : o.length) &&
                  r.searchParams.append(t, e[t]);
              }),
              !r.search)
            ) {
              const t = e.q || e.query;
              if (!t) throw new Error('No query was provided');
              r.searchParams.append('q', t);
            }
            return r;
          }
          (t.constructSearchGalleryUrl = i),
            (t.searchGallery = async function (e, t) {
              const { pathname: r } = i(t),
                o = r.slice(1);
              return s.getImgurApiResponseFromResponse(
                await e.request({ url: o })
              );
            });
        },
        894: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getAuthorizationHeader = void 0);
          const o = r(419),
            s = r(80);
          t.getAuthorizationHeader = async function (e) {
            if (o.isAccessToken(e.credentials))
              return `Bearer ${e.credentials.accessToken}`;
            if (o.isClientId(e.credentials) && !o.isLogin(e.credentials))
              return `Client-ID ${e.credentials.clientId}`;
            const { clientId: t, username: r, password: a } = e.credentials,
              n = {
                url: s.AUTHORIZE_ENDPOINT,
                baseURL: s.IMGUR_API_PREFIX,
                params: { client_id: t, response_type: 'token' },
              };
            let i = await e.plainRequest(n);
            const u = Array.isArray(i.headers['set-cookie'])
              ? i.headers['set-cookie'][0]
              : i.headers['set-cookie'];
            if (!u) throw new Error('No cookies were set during authorization');
            const c = u.match('(^|;)[s]*authorize_token=([^;]*)');
            if (!c || c.length < 3)
              throw new Error('Unable to find authorize_token cookie');
            const l = c[2];
            (n.method = 'POST'),
              (n.data = { username: r, password: a, allow: l }),
              (n.followRedirect = !1),
              (n.headers = { cookie: `authorize_token=${l}` }),
              (i = await e.plainRequest(n));
            const d = i.headers.location;
            if (!d) throw new Error('Unable to parse location');
            const p = JSON.parse(
              '{"' +
                decodeURI(d.slice(d.indexOf('#') + 1))
                  .replace(/"/g, '\\"')
                  .replace(/&/g, '","')
                  .replace(/=/g, '":"') +
                '"}'
            ).access_token;
            return (e.credentials.accessToken = p), `Bearer ${p}`;
          };
        },
        870: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.deleteImage = void 0);
          const o = r(80),
            s = r(571);
          t.deleteImage = async function (e, t) {
            const r = `${o.IMAGE_ENDPOINT}/${t}`;
            return s.getImgurApiResponseFromResponse(
              await e.request({ url: r, method: 'DELETE' })
            );
          };
        },
        129: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.favoriteImage = void 0);
          const o = r(80),
            s = r(571);
          t.favoriteImage = async function (e, t) {
            const r = `${o.IMAGE_ENDPOINT}/${t}/favorite`;
            return s.getImgurApiResponseFromResponse(
              await e.request({ url: r, method: 'POST' })
            );
          };
        },
        455: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getImage = void 0);
          const o = r(80),
            s = r(571);
          t.getImage = async function (e, t) {
            const r = `${o.IMAGE_ENDPOINT}/${t}`;
            return s.getImgurApiResponseFromResponse(
              await e.request({ url: r })
            );
          };
        },
        176: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 });
          const o = r(780);
          o.__exportStar(r(870), t),
            o.__exportStar(r(129), t),
            o.__exportStar(r(455), t),
            o.__exportStar(r(831), t),
            o.__exportStar(r(328), t);
        },
        831: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.updateImage = void 0);
          const o = r(80),
            s = r(571);
          function a(e) {
            return (
              'string' == typeof e.title || 'string' == typeof e.description
            );
          }
          t.updateImage = async function (e, t) {
            if (Array.isArray(t)) {
              const r = t.map((t) => {
                if (!a(t))
                  throw new Error('Update requires a title and/or description');
                const r = `${o.IMAGE_ENDPOINT}/${t.imageHash}`,
                  n = s.createForm(t);
                return new Promise(async function (t) {
                  return t(
                    s.getImgurApiResponseFromResponse(
                      await e.request({ url: r, method: 'POST', data: n })
                    )
                  );
                });
              });
              return await Promise.all(r);
            }
            if (!a(t))
              throw new Error('Update requires a title and/or description');
            const r = `${o.IMAGE_ENDPOINT}/${t.imageHash}`,
              n = s.createForm(t);
            return s.getImgurApiResponseFromResponse(
              await e.request({ url: r, method: 'POST', data: n })
            );
          };
        },
        328: (e, t, r) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.upload = void 0);
          const o = r(571),
            s = r(80);
          t.upload = async function (e, t) {
            if (Array.isArray(t)) {
              const r = t.map((t) => {
                const r = o.createForm(t);
                return new Promise(async (t) => {
                  t(
                    o.getImgurApiResponseFromResponse(
                      await e.request({
                        url: s.UPLOAD_ENDPOINT,
                        method: 'POST',
                        data: r,
                        onUploadProgress: (t) => {
                          console.log({ progressEvent: t }),
                            e.emit('uploadProgress', { ...t });
                        },
                      })
                    )
                  );
                });
              });
              return await Promise.all(r);
            }
            const r = o.createForm(t),
              a = await e.request({
                url: s.UPLOAD_ENDPOINT,
                method: 'POST',
                data: r,
                onUploadProgress: (t) => {
                  console.log({ progressEvent: t }),
                    e.emit('uploadProgress', { ...t });
                },
              });
            return Promise.resolve(o.getImgurApiResponseFromResponse(a));
          };
        },
        376: (e) => {
          e.exports = require('axios');
        },
        614: (e) => {
          e.exports = require('events');
        },
        353: (e) => {
          e.exports = require('form-data');
        },
        780: (e) => {
          e.exports = require('tslib');
        },
        835: (e) => {
          e.exports = require('url');
        },
      },
      t = {};
    var r = {};
    return (
      (function r(o) {
        var s = t[o];
        if (void 0 !== s) return s.exports;
        var a = (t[o] = { exports: {} });
        return e[o](a, a.exports, r), a.exports;
      })(934),
      r.default
    );
  })();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbWd1ci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvYWxidW0vZ2V0QWxidW0udHMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvYWxidW0vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvY2xpZW50LnRzIiwid2VicGFjazovL2ltZ3VyLy4vc3JjL2NvbW1vbi9lbmRwb2ludHMudHMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvY29tbW9uL3R5cGVzLnRzIiwid2VicGFjazovL2ltZ3VyLy4vc3JjL2NvbW1vbi91dGlscy50cyIsIndlYnBhY2s6Ly9pbWd1ci8uL3NyYy9nYWxsZXJ5L2dldEdhbGxlcnkudHMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvZ2FsbGVyeS9nZXRTdWJyZWRkaXRHYWxsZXJ5LnRzIiwid2VicGFjazovL2ltZ3VyLy4vc3JjL2dhbGxlcnkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvZ2FsbGVyeS9zZWFyY2hHYWxsZXJ5LnRzIiwid2VicGFjazovL2ltZ3VyLy4vc3JjL2dldEF1dGhvcml6YXRpb25IZWFkZXIudHMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvaW1hZ2UvZGVsZXRlSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vaW1ndXIvLi9zcmMvaW1hZ2UvZmF2b3JpdGVJbWFnZS50cyIsIndlYnBhY2s6Ly9pbWd1ci8uL3NyYy9pbWFnZS9nZXRJbWFnZS50cyIsIndlYnBhY2s6Ly9pbWd1ci8uL3NyYy9pbWFnZS9pbmRleC50cyIsIndlYnBhY2s6Ly9pbWd1ci8uL3NyYy9pbWFnZS91cGRhdGVJbWFnZS50cyIsIndlYnBhY2s6Ly9pbWd1ci8uL3NyYy9pbWFnZS91cGxvYWQudHMiLCJ3ZWJwYWNrOi8vaW1ndXIvZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovL2ltZ3VyL2V4dGVybmFsIFwiZXZlbnRzXCIiLCJ3ZWJwYWNrOi8vaW1ndXIvZXh0ZXJuYWwgXCJmb3JtLWRhdGFcIiIsIndlYnBhY2s6Ly9pbWd1ci9leHRlcm5hbCBcInRzbGliXCIiLCJ3ZWJwYWNrOi8vaW1ndXIvZXh0ZXJuYWwgXCJ1cmxcIiIsIndlYnBhY2s6Ly9pbWd1ci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pbWd1ci8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJhIiwiaSIsInRoaXMiLCJhc3luYyIsImNsaWVudCIsImFsYnVtSGFzaCIsInVybCIsIkFMQlVNX0VORFBPSU5UIiwiZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSIsInJlcXVlc3QiLCJVU0VSQUdFTlQiLCJJbWd1ckNsaWVudCIsIkV2ZW50RW1pdHRlciIsImNyZWRlbnRpYWxzIiwic3VwZXIiLCJwbGFpbkZldGNoZXIiLCJjcmVhdGUiLCJiYXNlVVJMIiwiSU1HVVJfQVBJX1BSRUZJWCIsImhlYWRlcnMiLCJyZXNwb25zZVR5cGUiLCJmZXRjaGVyIiwiaW50ZXJjZXB0b3JzIiwidXNlIiwiY29uZmlnIiwiYXV0aG9yaXphdGlvbiIsImdldEF1dGhvcml6YXRpb25IZWFkZXIiLCJlIiwiUHJvbWlzZSIsInJlamVjdCIsIm9wdGlvbnMiLCJpbWFnZUhhc2giLCJkZWxldGVJbWFnZSIsImZhdm9yaXRlSW1hZ2UiLCJnZXRBbGJ1bSIsImdldEdhbGxlcnkiLCJnZXRTdWJyZWRkaXRHYWxsZXJ5Iiwic2VhcmNoR2FsbGVyeSIsImdldEltYWdlIiwicGF5bG9hZCIsInVwZGF0ZUltYWdlIiwidXBsb2FkIiwiQVBJX1ZFUlNJT04iLCJBVVRIT1JJWkVfRU5EUE9JTlQiLCJJTUFHRV9FTkRQT0lOVCIsIlVQTE9BRF9FTkRQT0lOVCIsIkdBTExFUllfRU5EUE9JTlQiLCJTVUJSRURESVRfR0FMTEVSWV9FTkRQT0lOVCIsIlNFQVJDSF9HQUxMRVJZX0VORFBPSU5UIiwiYXJnIiwidW5kZWZpbmVkIiwiYWNjZXNzVG9rZW4iLCJjbGllbnRJZCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJpc0Jhc2U2NCIsImJhc2U2NCIsInR5cGUiLCJpc1N0cmVhbSIsInN0cmVhbSIsImltYWdlIiwiZm9ybSIsImFwcGVuZCIsImtleSIsInZhbHVlIiwiT2JqZWN0IiwiZW50cmllcyIsInN1cHBvcnRlZFVwbG9hZE9iamVjdFR5cGVzIiwiaW5kZXhPZiIsInJlc3BvbnNlIiwiZGF0YSIsInN0YXR1cyIsInN1Y2Nlc3MiLCJkZWZhdWx0T3B0aW9ucyIsInNlY3Rpb24iLCJzb3J0IiwiY29uc3RydWN0R2FsbGVyeVVybCIsIm1lcmdlZE9wdGlvbnMiLCJhc3NpZ24iLCJ1cmkiLCJ3aW5kb3ciLCJwYWdlIiwiVVJMIiwic2hvd1ZpcmFsIiwic2VhcmNoUGFyYW1zIiwidG9TdHJpbmciLCJtYXR1cmUiLCJhbGJ1bV9wcmV2aWV3cyIsInBhdGhuYW1lIiwiZmluYWxQYXRobmFtZSIsInNsaWNlIiwiY29uc3RydWN0U3VicmVkZGl0R2FsbGVyeVVybCIsInN1YnJlZGRpdCIsImFkdmFuY2VkUGFyYW1ldGVycyIsImNvbnN0cnVjdFNlYXJjaEdhbGxlcnlVcmwiLCJmb3JFYWNoIiwicGFyYW0iLCJsZW5ndGgiLCJzZWFyY2giLCJxdWVyeSIsInEiLCJFcnJvciIsImlzQWNjZXNzVG9rZW4iLCJpc0NsaWVudElkIiwiaXNMb2dpbiIsInBhcmFtcyIsImNsaWVudF9pZCIsInJlc3BvbnNlX3R5cGUiLCJwbGFpblJlcXVlc3QiLCJjb29raWVzIiwiQXJyYXkiLCJpc0FycmF5IiwibWF0Y2hlcyIsIm1hdGNoIiwiYXV0aG9yaXplVG9rZW4iLCJtZXRob2QiLCJhbGxvdyIsImZvbGxvd1JlZGlyZWN0IiwiY29va2llIiwibG9jYXRpb24iLCJKU09OIiwicGFyc2UiLCJkZWNvZGVVUkkiLCJyZXBsYWNlIiwiYWNjZXNzX3Rva2VuIiwiaXNWYWxpZFVwZGF0ZVBheWxvYWQiLCJwIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInByb21pc2VzIiwibWFwIiwiY3JlYXRlRm9ybSIsInJlc29sdmUiLCJhbGwiLCJvblVwbG9hZFByb2dyZXNzIiwicHJvZ3Jlc3NFdmVudCIsImNvbnNvbGUiLCJsb2ciLCJlbWl0IiwicmVxdWlyZSIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImNhY2hlZE1vZHVsZSIsIl9fd2VicGFja19tb2R1bGVzX18iXSwibWFwcGluZ3MiOiJDQUFBLFNBQTJDQSxFQUFNQyxHQUNoRCxHQUFzQixpQkFBWkMsU0FBMEMsaUJBQVhDLE9BQ3hDQSxPQUFPRCxRQUFVRCxTQUNiLEdBQXFCLG1CQUFYRyxRQUF5QkEsT0FBT0MsSUFDOUNELE9BQU8sR0FBSUgsT0FDUCxDQUNKLElBQUlLLEVBQUlMLElBQ1IsSUFBSSxJQUFJTSxLQUFLRCxHQUF1QixpQkFBWkosUUFBdUJBLFFBQVVGLEdBQU1PLEdBQUtELEVBQUVDLElBUHhFLENBU0dDLE1BQU0sV0FDVCxNLDJHQ1RBLGNBRUEsU0FFQSxXQUFPQyxlQUNMQyxFQUNBQyxHQUVBLE1BQU1DLEVBQU0sR0FBRyxFQUFBQyxrQkFBa0JGLElBQ2pDLE9BQU8sRUFBQUcsc0NBQ0NKLEVBQU9LLFFBQVEsQ0FBRUgsVyxzRUNYM0Isd0IsbUdDQUEsU0FDQSxTQUNBLFNBUUEsU0FRQSxTQUNBLFFBVU1JLEVBQVksdURBRWxCLDRCQUdBLE1BQWFDLFVBQW9CLEVBQUFDLGFBSS9CLFlBQXFCQyxHQUNuQkMsUUFEbUIsS0FBQUQsY0FHbkJYLEtBQUthLGFBQWUsVUFBTUMsT0FBTyxDQUMvQkMsUUFBUyxFQUFBQyxpQkFDVEMsUUFBUyxDQUNQLGFBQWNULEdBRWhCVSxhQUFjLFNBRWhCbEIsS0FBS21CLFFBQVUsVUFBTUwsT0FBTyxDQUMxQkMsUUFBUyxFQUFBQyxpQkFDVEMsUUFBUyxDQUNQLGFBQWNULEdBRWhCVSxhQUFjLFNBRWhCbEIsS0FBS21CLFFBQVFDLGFBQWFiLFFBQVFjLEtBQ2hDcEIsTUFBT3FCLElBQ0xB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SSxRQUFRLFUsUUNBekI5SSxFQUFPRCxRQUFVK0ksUUFBUSxTQ0NyQkMsRUFBMkIsRyxnQkFHL0IsU0FBU0MsRUFBb0JDLEdBRTVCLElBQUlDLEVBQWVILEVBQXlCRSxHQUM1QyxRQUFxQjVGLElBQWpCNkYsRUFDSCxPQUFPQSxFQUFhbkosUUFHckIsSUFBSUMsRUFBUytJLEVBQXlCRSxHQUFZLENBR2pEbEosUUFBUyxJQU9WLE9BSEFvSixFQUFvQkYsR0FBVWpKLEVBQVFBLEVBQU9ELFFBQVNpSixHQUcvQ2hKLEVBQU9ELFFDckJmLE0iLCJmaWxlIjoiaW1ndXIubm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQgeyBBTEJVTV9FTkRQT0lOVCB9IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSwgQWxidW1EYXRhIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxidW0oXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIGFsYnVtSGFzaDogc3RyaW5nXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8QWxidW1EYXRhPj4ge1xuICBjb25zdCB1cmwgPSBgJHtBTEJVTV9FTkRQT0lOVH0vJHthbGJ1bUhhc2h9YDtcbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gICAgYXdhaXQgY2xpZW50LnJlcXVlc3QoeyB1cmwgfSlcbiAgKSBhcyBJbWd1ckFwaVJlc3BvbnNlPEFsYnVtRGF0YT47XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL2dldEFsYnVtJztcbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgeyBnZXRBdXRob3JpemF0aW9uSGVhZGVyIH0gZnJvbSAnLi9nZXRBdXRob3JpemF0aW9uSGVhZGVyJztcbmltcG9ydCB7XG4gIGRlbGV0ZUltYWdlLFxuICBmYXZvcml0ZUltYWdlLFxuICBnZXRJbWFnZSxcbiAgdXBsb2FkLFxuICB1cGRhdGVJbWFnZSxcbiAgVXBkYXRlSW1hZ2VQYXlsb2FkLFxufSBmcm9tICcuL2ltYWdlJztcbmltcG9ydCB7XG4gIEdhbGxlcnlPcHRpb25zLFxuICBnZXRHYWxsZXJ5LFxuICBnZXRTdWJyZWRkaXRHYWxsZXJ5LFxuICBTdWJyZWRkaXRHYWxsZXJ5T3B0aW9ucyxcbiAgc2VhcmNoR2FsbGVyeSxcbiAgU2VhcmNoR2FsbGVyeU9wdGlvbnMsXG59IGZyb20gJy4vZ2FsbGVyeSc7XG5pbXBvcnQgeyBnZXRBbGJ1bSB9IGZyb20gJy4vYWxidW0nO1xuaW1wb3J0IHsgSU1HVVJfQVBJX1BSRUZJWCB9IGZyb20gJy4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQge1xuICBBbGJ1bURhdGEsXG4gIENyZWRlbnRpYWxzLFxuICBHYWxsZXJ5RGF0YSxcbiAgSW1hZ2VEYXRhLFxuICBJbWd1ckFwaVJlc3BvbnNlLFxuICBQYXlsb2FkLFxufSBmcm9tICcuL2NvbW1vbi90eXBlcyc7XG5cbmNvbnN0IFVTRVJBR0VOVCA9ICdpbWd1ci9uZXh0IChodHRwczovL2dpdGh1Yi5jb20va2FpbWFsbGVhL25vZGUtaW1ndXIpJztcblxuaW1wb3J0IGF4aW9zLCB7IEF4aW9zSW5zdGFuY2UsIEF4aW9zUmVzcG9uc2UsIEF4aW9zUmVxdWVzdENvbmZpZyB9IGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IHR5cGUgeyBDcmVkZW50aWFscyBhcyBJbWd1ckNyZWRlbnRpYWxzIH07XG5leHBvcnQgY2xhc3MgSW1ndXJDbGllbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBwcml2YXRlIHBsYWluRmV0Y2hlcjogQXhpb3NJbnN0YW5jZTtcbiAgcHJpdmF0ZSBmZXRjaGVyOiBBeGlvc0luc3RhbmNlO1xuXG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnBsYWluRmV0Y2hlciA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgICBiYXNlVVJMOiBJTUdVUl9BUElfUFJFRklYLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAndXNlci1hZ2VudCc6IFVTRVJBR0VOVCxcbiAgICAgIH0sXG4gICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICB9KTtcbiAgICB0aGlzLmZldGNoZXIgPSBheGlvcy5jcmVhdGUoe1xuICAgICAgYmFzZVVSTDogSU1HVVJfQVBJX1BSRUZJWCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ3VzZXItYWdlbnQnOiBVU0VSQUdFTlQsXG4gICAgICB9LFxuICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgfSk7XG4gICAgdGhpcy5mZXRjaGVyLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShcbiAgICAgIGFzeW5jIChjb25maWc6IEF4aW9zUmVxdWVzdENvbmZpZykgPT4ge1xuICAgICAgICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzID8gY29uZmlnLmhlYWRlcnMgOiB7fTtcbiAgICAgICAgY29uZmlnLmhlYWRlcnMuYXV0aG9yaXphdGlvbiA9IGF3YWl0IGdldEF1dGhvcml6YXRpb25IZWFkZXIodGhpcyk7XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICB9LFxuICAgICAgKGU6IEVycm9yKSA9PiBQcm9taXNlLnJlamVjdChlKVxuICAgICk7XG4gIH1cblxuICBwbGFpblJlcXVlc3Qob3B0aW9uczogQXhpb3NSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPHVua25vd24+PiB7XG4gICAgcmV0dXJuIHRoaXMucGxhaW5GZXRjaGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcmVxdWVzdChvcHRpb25zOiBBeGlvc1JlcXVlc3RDb25maWcgPSB7fSk6IFByb21pc2U8QXhpb3NSZXNwb25zZTx1bmtub3duPj4ge1xuICAgIHJldHVybiB0aGlzLmZldGNoZXIob3B0aW9ucyk7XG4gIH1cblxuICBkZWxldGVJbWFnZShpbWFnZUhhc2g6IHN0cmluZyk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxib29sZWFuPj4ge1xuICAgIHJldHVybiBkZWxldGVJbWFnZSh0aGlzLCBpbWFnZUhhc2gpO1xuICB9XG5cbiAgZmF2b3JpdGVJbWFnZShpbWFnZUhhc2g6IHN0cmluZyk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxzdHJpbmc+PiB7XG4gICAgcmV0dXJuIGZhdm9yaXRlSW1hZ2UodGhpcywgaW1hZ2VIYXNoKTtcbiAgfVxuXG4gIGdldEFsYnVtKGFsYnVtSGFzaDogc3RyaW5nKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEFsYnVtRGF0YT4+IHtcbiAgICByZXR1cm4gZ2V0QWxidW0odGhpcywgYWxidW1IYXNoKTtcbiAgfVxuXG4gIGdldEdhbGxlcnkob3B0aW9uczogR2FsbGVyeU9wdGlvbnMpOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gICAgcmV0dXJuIGdldEdhbGxlcnkodGhpcywgb3B0aW9ucyk7XG4gIH1cblxuICBnZXRTdWJyZWRkaXRHYWxsZXJ5KFxuICAgIG9wdGlvbnM6IFN1YnJlZGRpdEdhbGxlcnlPcHRpb25zXG4gICk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT4+IHtcbiAgICByZXR1cm4gZ2V0U3VicmVkZGl0R2FsbGVyeSh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHNlYXJjaEdhbGxlcnkoXG4gICAgb3B0aW9uczogU2VhcmNoR2FsbGVyeU9wdGlvbnNcbiAgKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEdhbGxlcnlEYXRhPj4ge1xuICAgIHJldHVybiBzZWFyY2hHYWxsZXJ5KHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0SW1hZ2UoaW1hZ2VIYXNoOiBzdHJpbmcpOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPj4ge1xuICAgIHJldHVybiBnZXRJbWFnZSh0aGlzLCBpbWFnZUhhc2gpO1xuICB9XG5cbiAgdXBkYXRlSW1hZ2UoXG4gICAgcGF5bG9hZDogVXBkYXRlSW1hZ2VQYXlsb2FkIHwgVXBkYXRlSW1hZ2VQYXlsb2FkW11cbiAgKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+IHwgSW1ndXJBcGlSZXNwb25zZTxib29sZWFuPltdPiB7XG4gICAgcmV0dXJuIHVwZGF0ZUltYWdlKHRoaXMsIHBheWxvYWQpO1xuICB9XG5cbiAgdXBsb2FkKFxuICAgIHBheWxvYWQ6IHN0cmluZyB8IHN0cmluZ1tdIHwgUGF5bG9hZCB8IFBheWxvYWRbXVxuICApOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPiB8IEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPltdPiB7XG4gICAgcmV0dXJuIHVwbG9hZCh0aGlzLCBwYXlsb2FkKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IElNR1VSX0FQSV9QUkVGSVggPSAnaHR0cHM6Ly9hcGkuaW1ndXIuY29tJztcblxuZXhwb3J0IGNvbnN0IEFQSV9WRVJTSU9OID0gJzMnO1xuXG5leHBvcnQgY29uc3QgQVVUSE9SSVpFX0VORFBPSU5UID0gJ29hdXRoMi9hdXRob3JpemUnO1xuXG5leHBvcnQgY29uc3QgQUxCVU1fRU5EUE9JTlQgPSBgJHtBUElfVkVSU0lPTn0vYWxidW1gO1xuXG5leHBvcnQgY29uc3QgSU1BR0VfRU5EUE9JTlQgPSBgJHtBUElfVkVSU0lPTn0vaW1hZ2VgO1xuXG5leHBvcnQgY29uc3QgVVBMT0FEX0VORFBPSU5UID0gYCR7QVBJX1ZFUlNJT059L3VwbG9hZGA7XG5cbmV4cG9ydCBjb25zdCBHQUxMRVJZX0VORFBPSU5UID0gYCR7QVBJX1ZFUlNJT059L2dhbGxlcnlgO1xuXG5leHBvcnQgY29uc3QgU1VCUkVERElUX0dBTExFUllfRU5EUE9JTlQgPSBgJHtBUElfVkVSU0lPTn0vZ2FsbGVyeS9yYDtcblxuZXhwb3J0IGNvbnN0IFNFQVJDSF9HQUxMRVJZX0VORFBPSU5UID0gYCR7QVBJX1ZFUlNJT059L2dhbGxlcnkvc2VhcmNoYDtcbiIsImltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSAnc3RyZWFtJztcblxuZXhwb3J0IGludGVyZmFjZSBBY2Nlc3NUb2tlbiB7XG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpZW50SWQge1xuICBjbGllbnRJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvZ2luIGV4dGVuZHMgQ2xpZW50SWQge1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVkZW50aWFscyA9IEFjY2Vzc1Rva2VuIHwgQ2xpZW50SWQgfCBMb2dpbjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWNjZXNzVG9rZW4oYXJnOiB1bmtub3duKTogYXJnIGlzIEFjY2Vzc1Rva2VuIHtcbiAgcmV0dXJuIChhcmcgYXMgQWNjZXNzVG9rZW4pLmFjY2Vzc1Rva2VuICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NsaWVudElkKGFyZzogdW5rbm93bik6IGFyZyBpcyBDbGllbnRJZCB7XG4gIHJldHVybiAoYXJnIGFzIENsaWVudElkKS5jbGllbnRJZCAhPT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2dpbihhcmc6IHVua25vd24pOiBhcmcgaXMgTG9naW4ge1xuICByZXR1cm4gKFxuICAgIChhcmcgYXMgTG9naW4pLmNsaWVudElkICE9PSB1bmRlZmluZWQgJiZcbiAgICAoYXJnIGFzIExvZ2luKS51c2VybmFtZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgKGFyZyBhcyBMb2dpbikucGFzc3dvcmQgIT09IHVuZGVmaW5lZFxuICApO1xufVxuXG5pbnRlcmZhY2UgQ29tbW9uRGF0YSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmcgfCBudWxsO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nIHwgbnVsbDtcbiAgZGF0ZXRpbWU6IG51bWJlcjtcbiAgbGluazogc3RyaW5nO1xuXG4gIGFkX2NvbmZpZz86IHtcbiAgICBzYWZlRmxhZ3M6IHN0cmluZ1tdO1xuICAgIGhpZ2hSaXNrRmxhZ3M6IHN0cmluZ1tdO1xuICAgIHVuc2FmZUZsYWdzOiBzdHJpbmdbXTtcbiAgICB3YWxsVW5zYWZlRmxhZ3M6IHN0cmluZ1tdO1xuICAgIHNob3dzQWRzOiBib29sZWFuO1xuICB9O1xuICBhZF90eXBlOiBudW1iZXI7XG4gIGFkX3VybDogc3RyaW5nO1xuXG4gIGFjY291bnRfdXJsOiBzdHJpbmcgfCBudWxsO1xuICBhY2NvdW50X2lkOiBzdHJpbmcgfCBudWxsO1xuICBmYXZvcml0ZTogYm9vbGVhbjtcbiAgaXNfYWQ6IGJvb2xlYW47XG4gIGlzX2FsYnVtOiBib29sZWFuO1xuICBpbl9nYWxsZXJ5OiBib29sZWFuO1xuICBpbl9tb3N0X3ZpcmFsOiBib29sZWFuO1xuICBuc2Z3OiBib29sZWFuIHwgbnVsbDtcbiAgc2VjdGlvbjogc3RyaW5nIHwgbnVsbDtcbiAgdGFnczogQXJyYXk8e1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkaXNwbGF5X25hbWU6IHN0cmluZztcbiAgICBmb2xsb3dlcnM6IG51bWJlcjtcbiAgICB0b3RhbF9pdGVtczogbnVtYmVyO1xuICAgIGZvbGxvd2luZzogYm9vbGVhbjtcbiAgICBpc193aGl0ZWxpc3RlZDogYm9vbGVhbjtcbiAgICBiYWNrZ3JvdW5kX2hhc2g6IHN0cmluZztcbiAgICB0aHVtYm5haWxfaGFzaDogc3RyaW5nIHwgbnVsbDtcbiAgICBhY2NlbnQ6IHN0cmluZztcbiAgICBiYWNrZ3JvdW5kX2lzX2FuaW1hdGVkOiBib29sZWFuO1xuICAgIHRodW1ibmFpbF9pc19hbmltYXRlZDogYm9vbGVhbjtcbiAgICBpc19wcm9tb3RlZDogYm9vbGVhbjtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGxvZ29faGFzaDogc3RyaW5nIHwgbnVsbDtcbiAgICBsb2dvX2Rlc3RpbmF0aW9uX3VybDogc3RyaW5nIHwgbnVsbDtcbiAgICBkZXNjcmlwdGlvbl9hbm5vdGF0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH0+O1xuICB0b3BpYzogc3RyaW5nIHwgbnVsbDtcbiAgdG9waWNfaWQ6IHN0cmluZyB8IG51bGw7XG4gIHZvdGU6IG51bGw7XG5cbiAgY29tbWVudF9jb3VudDogbnVtYmVyIHwgbnVsbDtcbiAgZmF2b3JpdGVfY291bnQ6IG51bWJlciB8IG51bGw7XG4gIHVwczogbnVtYmVyIHwgbnVsbDtcbiAgZG93bnM6IG51bWJlciB8IG51bGw7XG4gIHNjb3JlOiBudW1iZXIgfCBudWxsO1xuICBwb2ludHM6IG51bWJlciB8IG51bGw7XG4gIHZpZXdzOiBudW1iZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIEltYWdlRGF0YSBleHRlbmRzIENvbW1vbkRhdGEge1xuICB0eXBlOiBzdHJpbmc7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBzaXplOiBudW1iZXI7XG4gIGRlbGV0ZWhhc2g/OiBzdHJpbmc7XG4gIGJhbmR3aWR0aDogbnVtYmVyO1xuICBhbmltYXRlZDogYm9vbGVhbjtcbiAgaGFzX3NvdW5kOiBib29sZWFuO1xuICBlZGl0ZWQ6IHN0cmluZztcbiAgbXA0X3NpemU/OiBudW1iZXI7XG4gIG1wND86IHN0cmluZztcbiAgZ2lmdj86IHN0cmluZztcbiAgaGxzPzogc3RyaW5nO1xuICBsb29waW5nPzogYm9vbGVhbjtcbiAgcHJvY2Vzc2luZz86IHtcbiAgICBzdGF0dXM6ICdwZW5kaW5nJyB8ICdjb21wbGV0ZWQnO1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFsYnVtRGF0YSBleHRlbmRzIENvbW1vbkRhdGEge1xuICBjb3Zlcjogc3RyaW5nIHwgbnVsbDtcbiAgY292ZXJfd2lkdGg6IG51bWJlciB8IG51bGw7XG4gIGNvdmVyX2hlaWdodDogbnVtYmVyIHwgbnVsbDtcbiAgbGF5b3V0OiBzdHJpbmc7XG4gIHByaXZhY3k6IHN0cmluZztcbiAgaW5jbHVkZV9hbGJ1bV9hZHM6IGJvb2xlYW47XG4gIGltYWdlczogSW1hZ2VEYXRhW107XG4gIGltYWdlc19jb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBHYWxsZXJ5RGF0YSA9IEFycmF5PEltYWdlRGF0YSB8IEFsYnVtRGF0YT47XG5leHBvcnQgaW50ZXJmYWNlIFBheWxvYWQge1xuICBpbWFnZT86IHN0cmluZztcbiAgYmFzZTY0Pzogc3RyaW5nO1xuICB0eXBlPzogJ3N0cmVhbScgfCAndXJsJyB8ICdiYXNlNjQnO1xuICBuYW1lPzogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGFsYnVtPzogc3RyaW5nO1xuICBzdHJlYW0/OiBSZWFkYWJsZTtcbiAgZGlzYWJsZV9hdWRpbz86ICcxJyB8ICcwJztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW1ndXJBcGlSZXNwb25zZTxcbiAgVCA9XG4gICAgfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICAgIHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXVxuICAgIHwgc3RyaW5nXG4gICAgfCBib29sZWFuXG4gICAgfCBJbWFnZURhdGFcbiAgICB8IEdhbGxlcnlEYXRhXG4gICAgfCBBbGJ1bURhdGFcbj4ge1xuICBkYXRhOiBUO1xuICBzdGF0dXM6IG51bWJlcjtcbiAgc3VjY2VzczogYm9vbGVhbjtcbn1cbiIsImltcG9ydCB7IEF4aW9zUmVzcG9uc2UgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCB7IEltZ3VyQXBpUmVzcG9uc2UsIFBheWxvYWQgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSAnc3RyZWFtJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFzZTY0KHBheWxvYWQ6IHN0cmluZyB8IFBheWxvYWQpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2YgcGF5bG9hZC5iYXNlNjQgIT09ICd1bmRlZmluZWQnICYmIHBheWxvYWQudHlwZSA9PT0gJ2Jhc2U2NCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ltYWdlVXJsKHBheWxvYWQ6IHN0cmluZyB8IFBheWxvYWQpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkLmltYWdlICE9PSAndW5kZWZpbmVkJyAmJiBwYXlsb2FkLnR5cGUgPT09ICd1cmwnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJlYW0ocGF5bG9hZDogc3RyaW5nIHwgUGF5bG9hZCk6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHBheWxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkLnN0cmVhbSAhPT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8vIFRPRE86IFJlZmFjdG9yIHRoaXMgdG8gYmUgYSB1bmlxdWUgbmFtZSBvZiBzb21lIGtpbmQgKGEgaGFzaD8pXG5leHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlKHBheWxvYWQ6IHN0cmluZyB8IFBheWxvYWQpOiBzdHJpbmcgfCBSZWFkYWJsZSB7XG4gIGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcGF5bG9hZDtcbiAgfVxuXG4gIGlmIChpc0Jhc2U2NChwYXlsb2FkKSkge1xuICAgIHJldHVybiAncGF5bG9hZC5iYXNlNjQnIGFzIHN0cmluZztcbiAgfSBlbHNlIGlmIChpc1N0cmVhbShwYXlsb2FkKSkge1xuICAgIHJldHVybiAncGF5bG9hZC5zdHJlYW0nIGFzIHN0cmluZztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcGF5bG9hZC5pbWFnZSBhcyBzdHJpbmc7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZvcm0ocGF5bG9hZDogc3RyaW5nIHwgUGF5bG9hZCk6IEZvcm1EYXRhIHtcbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gIGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICBmb3JtLmFwcGVuZCgnaW1hZ2UnLCBwYXlsb2FkKTtcbiAgICByZXR1cm4gZm9ybTtcbiAgfVxuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHBheWxvYWQpKSB7XG4gICAgY29uc3Qgc3VwcG9ydGVkVXBsb2FkT2JqZWN0VHlwZXMgPSBbJ2Jhc2U2NCcsICdzdHJlYW0nXTtcbiAgICBpZiAoc3VwcG9ydGVkVXBsb2FkT2JqZWN0VHlwZXMuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgaWYgKHN1cHBvcnRlZFVwbG9hZE9iamVjdFR5cGVzLmluZGV4T2YocGF5bG9hZC50eXBlIGFzIHN0cmluZykgIT09IC0xKSB7XG4gICAgICAgIGZvcm0uYXBwZW5kKGtleSwgcGF5bG9hZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm0uYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gIHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlXG4pOiBJbWd1ckFwaVJlc3BvbnNlIHtcbiAgaWYgKFxuICAgIHR5cGVvZiByZXNwb25zZS5kYXRhPy5zdGF0dXMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIHJlc3BvbnNlLmRhdGE/LnN1Y2Nlc3MgIT09ICd1bmRlZmluZWQnXG4gICkge1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRhOiByZXNwb25zZS5kYXRhLFxuICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgIC8vIFRPRE86IGRldGVybWluZSB0aGUgc3VjY2VzcyBvZiB0aGUgY2FsbD9cbiAgICBzdWNjZXNzOiB0cnVlLFxuICB9O1xufVxuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHsgR0FMTEVSWV9FTkRQT0lOVCwgSU1HVVJfQVBJX1BSRUZJWCB9IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSwgR2FsbGVyeURhdGEgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBDb21tb25TZWN0aW9uUHJvcHMgPSB7XG4gIHNvcnQ/OiAndmlyYWwnIHwgJ3RvcCcgfCAndGltZSc7XG4gIHBhZ2U/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBIb3RTZWN0aW9uID0gQ29tbW9uU2VjdGlvblByb3BzICYge1xuICBzZWN0aW9uOiAnaG90Jztcbn07XG5cbmV4cG9ydCB0eXBlIFRvcFNlY3Rpb24gPSBDb21tb25TZWN0aW9uUHJvcHMgJiB7XG4gIHNlY3Rpb246ICd0b3AnO1xuICB3aW5kb3c/OiAnZGF5JyB8ICd3ZWVrJyB8ICdtb250aCcgfCAneWVhcicgfCAnYWxsJztcbn07XG5cbmV4cG9ydCB0eXBlIFVzZXJTZWN0aW9uID0gT21pdDxDb21tb25TZWN0aW9uUHJvcHMsICdzb3J0Jz4gJiB7XG4gIHNlY3Rpb246ICd1c2VyJztcbiAgc29ydD86ICd2aXJhbCcgfCAndG9wJyB8ICd0aW1lJyB8ICdyaXNpbmcnO1xufTtcblxuZXhwb3J0IHR5cGUgU2VjdGlvbk9wdGlvbnMgPSBIb3RTZWN0aW9uIHwgVG9wU2VjdGlvbiB8IFVzZXJTZWN0aW9uO1xuXG5leHBvcnQgdHlwZSBQcmVzZW50YXRpb25PcHRpb25zID0ge1xuICBzaG93VmlyYWw/OiBib29sZWFuO1xuICBtYXR1cmU/OiBib29sZWFuO1xuICBhbGJ1bV9wcmV2aWV3cz86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBHYWxsZXJ5T3B0aW9ucyA9IFNlY3Rpb25PcHRpb25zICYgUHJlc2VudGF0aW9uT3B0aW9ucztcblxuY29uc3QgZGVmYXVsdE9wdGlvbnM6IEdhbGxlcnlPcHRpb25zID0ge1xuICBzZWN0aW9uOiAnaG90JyxcbiAgc29ydDogJ3ZpcmFsJyxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RHYWxsZXJ5VXJsKG9wdGlvbnM6IEdhbGxlcnlPcHRpb25zKTogVVJMIHtcbiAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICBsZXQgdXJpID0gYCR7bWVyZ2VkT3B0aW9ucy5zZWN0aW9ufWA7XG5cbiAgaWYgKG1lcmdlZE9wdGlvbnMuc29ydCkge1xuICAgIHVyaSArPSBgLyR7bWVyZ2VkT3B0aW9ucy5zb3J0fWA7XG4gIH1cblxuICBpZiAobWVyZ2VkT3B0aW9ucy5zZWN0aW9uID09PSAndG9wJyAmJiBtZXJnZWRPcHRpb25zLndpbmRvdykge1xuICAgIHVyaSArPSBgLyR7bWVyZ2VkT3B0aW9ucy53aW5kb3d9YDtcbiAgfVxuXG4gIGlmIChtZXJnZWRPcHRpb25zLnBhZ2UpIHtcbiAgICB1cmkgKz0gYC8ke21lcmdlZE9wdGlvbnMucGFnZX1gO1xuICB9XG5cbiAgY29uc3QgdXJsID0gbmV3IFVSTChgJHtJTUdVUl9BUElfUFJFRklYfS8ke0dBTExFUllfRU5EUE9JTlR9LyR7dXJpfWApO1xuXG4gIGlmIChtZXJnZWRPcHRpb25zLnNob3dWaXJhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ3Nob3dWaXJhbCcsIG1lcmdlZE9wdGlvbnMuc2hvd1ZpcmFsLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgaWYgKG1lcmdlZE9wdGlvbnMubWF0dXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnbWF0dXJlJywgbWVyZ2VkT3B0aW9ucy5tYXR1cmUudG9TdHJpbmcoKSk7XG4gIH1cblxuICBpZiAobWVyZ2VkT3B0aW9ucy5hbGJ1bV9wcmV2aWV3cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoXG4gICAgICAnYWxidW1fcHJldmlld3MnLFxuICAgICAgbWVyZ2VkT3B0aW9ucy5hbGJ1bV9wcmV2aWV3cy50b1N0cmluZygpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRHYWxsZXJ5KFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBvcHRpb25zOiBHYWxsZXJ5T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gIGNvbnN0IHsgcGF0aG5hbWUgfSA9IGNvbnN0cnVjdEdhbGxlcnlVcmwob3B0aW9ucyk7XG4gIC8vIHNpbmNlIHdlJ3JlIHVzaW5nIHByZWZpeFVybCB3aXRoIGdvdCwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHN0YXJ0aW5nIHNsYXNoIG9yIGl0J2xsIHRocm93XG4gIGNvbnN0IGZpbmFsUGF0aG5hbWUgPSBwYXRobmFtZS5zbGljZSgxKTtcblxuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShcbiAgICBhd2FpdCBjbGllbnQucmVxdWVzdCh7IHVybDogZmluYWxQYXRobmFtZSB9KVxuICApIGFzIEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+O1xufVxuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHtcbiAgU1VCUkVERElUX0dBTExFUllfRU5EUE9JTlQsXG4gIElNR1VSX0FQSV9QUkVGSVgsXG59IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSwgR2FsbGVyeURhdGEgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBUaW1lT3B0aW9ucyA9IHtcbiAgc3VicmVkZGl0OiBzdHJpbmc7XG4gIHNvcnQ/OiAndGltZSc7XG4gIHBhZ2U/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBUb3BPcHRpb25zID0gT21pdDxUaW1lT3B0aW9ucywgJ3NvcnQnPiAmIHtcbiAgc29ydD86ICd0b3AnO1xuICB3aW5kb3c/OiAnZGF5JyB8ICd3ZWVrJyB8ICdtb250aCcgfCAneWVhcicgfCAnYWxsJztcbn07XG5cbmV4cG9ydCB0eXBlIFN1YnJlZGRpdEdhbGxlcnlPcHRpb25zID0gVGltZU9wdGlvbnMgfCBUb3BPcHRpb25zO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0U3VicmVkZGl0R2FsbGVyeVVybChcbiAgb3B0aW9uczogU3VicmVkZGl0R2FsbGVyeU9wdGlvbnNcbik6IFVSTCB7XG4gIGxldCB1cmkgPSBgJHtvcHRpb25zLnN1YnJlZGRpdH1gO1xuXG4gIGlmIChvcHRpb25zLnNvcnQpIHtcbiAgICB1cmkgKz0gYC8ke29wdGlvbnMuc29ydH1gO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuc29ydCA9PT0gJ3RvcCcgJiYgb3B0aW9ucy53aW5kb3cpIHtcbiAgICB1cmkgKz0gYC8ke29wdGlvbnMud2luZG93fWA7XG4gIH1cblxuICBpZiAob3B0aW9ucy5wYWdlKSB7XG4gICAgdXJpICs9IGAvJHtvcHRpb25zLnBhZ2V9YDtcbiAgfVxuXG4gIGNvbnN0IHVybCA9IG5ldyBVUkwoXG4gICAgYCR7SU1HVVJfQVBJX1BSRUZJWH0vJHtTVUJSRURESVRfR0FMTEVSWV9FTkRQT0lOVH0vJHt1cml9YFxuICApO1xuXG4gIHJldHVybiB1cmw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdWJyZWRkaXRHYWxsZXJ5KFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBvcHRpb25zOiBTdWJyZWRkaXRHYWxsZXJ5T3B0aW9uc1xuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEdhbGxlcnlEYXRhPj4ge1xuICBjb25zdCB7IHBhdGhuYW1lIH0gPSBjb25zdHJ1Y3RTdWJyZWRkaXRHYWxsZXJ5VXJsKG9wdGlvbnMpO1xuICAvLyBzaW5jZSB3ZSdyZSB1c2luZyBwcmVmaXhVcmwgd2l0aCBnb3QsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSBzdGFydGluZyBzbGFzaCBvciBpdCdsbCB0aHJvd1xuICBjb25zdCBmaW5hbFBhdGhuYW1lID0gcGF0aG5hbWUuc2xpY2UoMSk7XG5cbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gICAgYXdhaXQgY2xpZW50LnJlcXVlc3QoeyB1cmw6IGZpbmFsUGF0aG5hbWUgfSlcbiAgKSBhcyBJbWd1ckFwaVJlc3BvbnNlPEdhbGxlcnlEYXRhPjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vZ2V0R2FsbGVyeSc7XG5leHBvcnQgKiBmcm9tICcuL2dldFN1YnJlZGRpdEdhbGxlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9zZWFyY2hHYWxsZXJ5JztcbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IFNFQVJDSF9HQUxMRVJZX0VORFBPSU5ULCBJTUdVUl9BUElfUFJFRklYIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlLCBHYWxsZXJ5RGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IFVSTCB9IGZyb20gJ3VybCc7XG5cbmV4cG9ydCB0eXBlIFNlYXJjaE9wdGlvbnMgPSB7XG4gIHE/OiBzdHJpbmc7XG4gIHF1ZXJ5Pzogc3RyaW5nO1xuICBzb3J0PzogJ3RpbWUnIHwgJ3ZpcmFsJztcbiAgcGFnZT86IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIFRvcFNlYXJjaE9wdGlvbnMgPSBPbWl0PFNlYXJjaE9wdGlvbnMsICdzb3J0Jz4gJiB7XG4gIHNvcnQ/OiAndG9wJztcbiAgd2luZG93PzogJ2RheScgfCAnd2VlaycgfCAnbW9udGgnIHwgJ3llYXInIHwgJ2FsbCc7XG59O1xuXG5leHBvcnQgdHlwZSBBZHZhbmNlZFNlYXJjaFF1ZXJ5UGFyYW1ldGVycyA9IHtcbiAgcV9hbGw/OiBzdHJpbmc7XG4gIHFfYW55Pzogc3RyaW5nO1xuICBxX2V4YWN0bHk/OiBzdHJpbmc7XG4gIHFfbm90Pzogc3RyaW5nO1xuICBxX3R5cGU/OiAnanBnJyB8ICdwbmcnIHwgJ2dpZicgfCAnYW5pZ2lmJyB8ICdhbGJ1bSc7XG4gIHFfc2l6ZV9weD86ICdzbWFsbCcgfCAnbWVkJyB8ICdiaWcnIHwgJ2xyZycgfCAnaHVnZSc7XG59O1xuXG5jb25zdCBhZHZhbmNlZFBhcmFtZXRlcnM6IEFycmF5PGtleW9mIEFkdmFuY2VkU2VhcmNoUXVlcnlQYXJhbWV0ZXJzPiA9IFtcbiAgJ3FfYWxsJyxcbiAgJ3FfYW55JyxcbiAgJ3FfZXhhY3RseScsXG4gICdxX25vdCcsXG4gICdxX3R5cGUnLFxuICAncV9zaXplX3B4Jyxcbl07XG5cbmV4cG9ydCB0eXBlIFNlYXJjaEdhbGxlcnlPcHRpb25zID0gKFNlYXJjaE9wdGlvbnMgfCBUb3BTZWFyY2hPcHRpb25zKSAmXG4gIEFkdmFuY2VkU2VhcmNoUXVlcnlQYXJhbWV0ZXJzO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0U2VhcmNoR2FsbGVyeVVybChvcHRpb25zOiBTZWFyY2hHYWxsZXJ5T3B0aW9ucyk6IFVSTCB7XG4gIGxldCB1cmkgPSAnJztcblxuICBpZiAob3B0aW9ucy5zb3J0KSB7XG4gICAgdXJpICs9IGAvJHtvcHRpb25zLnNvcnR9YDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnNvcnQgPT09ICd0b3AnICYmIG9wdGlvbnMud2luZG93KSB7XG4gICAgdXJpICs9IGAvJHtvcHRpb25zLndpbmRvd31gO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMucGFnZSkge1xuICAgIHVyaSArPSBgLyR7b3B0aW9ucy5wYWdlfWA7XG4gIH1cblxuICBjb25zdCB1cmwgPSBuZXcgVVJMKGAke0lNR1VSX0FQSV9QUkVGSVh9LyR7U0VBUkNIX0dBTExFUllfRU5EUE9JTlR9JHt1cml9YCk7XG5cbiAgYWR2YW5jZWRQYXJhbWV0ZXJzLmZvckVhY2goKHBhcmFtKSA9PiB7XG4gICAgaWYgKG9wdGlvbnNbcGFyYW1dPy5sZW5ndGgpIHtcbiAgICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKHBhcmFtLCBvcHRpb25zW3BhcmFtXSBhcyBzdHJpbmcpO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKCF1cmwuc2VhcmNoKSB7XG4gICAgY29uc3QgcXVlcnkgPSBvcHRpb25zLnEgfHwgb3B0aW9ucy5xdWVyeTtcbiAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHF1ZXJ5IHdhcyBwcm92aWRlZCcpO1xuICAgIH1cblxuICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKCdxJywgcXVlcnkpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEdhbGxlcnkoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIG9wdGlvbnM6IFNlYXJjaEdhbGxlcnlPcHRpb25zXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gIGNvbnN0IHsgcGF0aG5hbWUgfSA9IGNvbnN0cnVjdFNlYXJjaEdhbGxlcnlVcmwob3B0aW9ucyk7XG4gIC8vIHNpbmNlIHdlJ3JlIHVzaW5nIHByZWZpeFVybCB3aXRoIGdvdCwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHN0YXJ0aW5nIHNsYXNoIG9yIGl0J2xsIHRocm93XG4gIGNvbnN0IGZpbmFsUGF0aG5hbWUgPSBwYXRobmFtZS5zbGljZSgxKTtcblxuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShcbiAgICBhd2FpdCBjbGllbnQucmVxdWVzdCh7IHVybDogZmluYWxQYXRobmFtZSB9KVxuICApIGFzIEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+O1xufVxuIiwiaW1wb3J0IHtcbiAgQWNjZXNzVG9rZW4sXG4gIGlzQWNjZXNzVG9rZW4sXG4gIGlzQ2xpZW50SWQsXG4gIGlzTG9naW4sXG59IGZyb20gJy4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi9jbGllbnQnO1xuaW1wb3J0IHsgSU1HVVJfQVBJX1BSRUZJWCwgQVVUSE9SSVpFX0VORFBPSU5UIH0gZnJvbSAnLi9jb21tb24vZW5kcG9pbnRzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEF1dGhvcml6YXRpb25IZWFkZXIoXG4gIGNsaWVudDogSW1ndXJDbGllbnRcbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGlmIChpc0FjY2Vzc1Rva2VuKGNsaWVudC5jcmVkZW50aWFscykpIHtcbiAgICByZXR1cm4gYEJlYXJlciAke2NsaWVudC5jcmVkZW50aWFscy5hY2Nlc3NUb2tlbn1gO1xuICB9XG5cbiAgaWYgKGlzQ2xpZW50SWQoY2xpZW50LmNyZWRlbnRpYWxzKSAmJiAhaXNMb2dpbihjbGllbnQuY3JlZGVudGlhbHMpKSB7XG4gICAgcmV0dXJuIGBDbGllbnQtSUQgJHtjbGllbnQuY3JlZGVudGlhbHMuY2xpZW50SWR9YDtcbiAgfVxuXG4gIGNvbnN0IHsgY2xpZW50SWQsIHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gY2xpZW50LmNyZWRlbnRpYWxzO1xuXG4gIGNvbnN0IG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge1xuICAgIHVybDogQVVUSE9SSVpFX0VORFBPSU5ULFxuICAgIGJhc2VVUkw6IElNR1VSX0FQSV9QUkVGSVgsXG4gICAgcGFyYW1zOiB7XG4gICAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxuICAgICAgcmVzcG9uc2VfdHlwZTogJ3Rva2VuJyxcbiAgICB9LFxuICB9O1xuXG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wbGFpblJlcXVlc3Qob3B0aW9ucyk7XG5cbiAgY29uc3QgY29va2llcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddKVxuICAgID8gcmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddWzBdXG4gICAgOiByZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ107XG5cbiAgaWYgKCFjb29raWVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb29raWVzIHdlcmUgc2V0IGR1cmluZyBhdXRob3JpemF0aW9uJyk7XG4gIH1cblxuICBjb25zdCBtYXRjaGVzID0gY29va2llcy5tYXRjaCgnKF58Oylbc10qYXV0aG9yaXplX3Rva2VuPShbXjtdKiknKTtcblxuICBpZiAoIW1hdGNoZXMgfHwgbWF0Y2hlcy5sZW5ndGggPCAzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmluZCBhdXRob3JpemVfdG9rZW4gY29va2llJyk7XG4gIH1cblxuICBjb25zdCBhdXRob3JpemVUb2tlbiA9IG1hdGNoZXNbMl07XG5cbiAgb3B0aW9ucy5tZXRob2QgPSAnUE9TVCc7XG4gIG9wdGlvbnMuZGF0YSA9IHtcbiAgICB1c2VybmFtZSxcbiAgICBwYXNzd29yZCxcbiAgICBhbGxvdzogYXV0aG9yaXplVG9rZW4sXG4gIH07XG5cbiAgb3B0aW9ucy5mb2xsb3dSZWRpcmVjdCA9IGZhbHNlO1xuICBvcHRpb25zLmhlYWRlcnMgPSB7XG4gICAgY29va2llOiBgYXV0aG9yaXplX3Rva2VuPSR7YXV0aG9yaXplVG9rZW59YCxcbiAgfTtcblxuICByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wbGFpblJlcXVlc3Qob3B0aW9ucyk7XG4gIGNvbnN0IGxvY2F0aW9uID0gcmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbjtcbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBhcnNlIGxvY2F0aW9uJyk7XG4gIH1cblxuICBjb25zdCB0b2tlbiA9IEpTT04ucGFyc2UoXG4gICAgJ3tcIicgK1xuICAgICAgZGVjb2RlVVJJKGxvY2F0aW9uLnNsaWNlKGxvY2F0aW9uLmluZGV4T2YoJyMnKSArIDEpKVxuICAgICAgICAucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpXG4gICAgICAgIC5yZXBsYWNlKC8mL2csICdcIixcIicpXG4gICAgICAgIC5yZXBsYWNlKC89L2csICdcIjpcIicpICtcbiAgICAgICdcIn0nXG4gICk7XG5cbiAgY29uc3QgYWNjZXNzVG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICgoY2xpZW50LmNyZWRlbnRpYWxzIGFzIHVua25vd24pIGFzIEFjY2Vzc1Rva2VuKS5hY2Nlc3NUb2tlbiA9IGFjY2Vzc1Rva2VuO1xuXG4gIHJldHVybiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YDtcbn1cbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IElNQUdFX0VORFBPSU5UIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlSW1hZ2UoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIGltYWdlSGFzaDogc3RyaW5nXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj4+IHtcbiAgY29uc3QgdXJsID0gYCR7SU1BR0VfRU5EUE9JTlR9LyR7aW1hZ2VIYXNofWA7XG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKFxuICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KHsgdXJsLCBtZXRob2Q6ICdERUxFVEUnIH0pXG4gICkgYXMgSW1ndXJBcGlSZXNwb25zZTxib29sZWFuPjtcbn1cbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IElNQUdFX0VORFBPSU5UIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmF2b3JpdGVJbWFnZShcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgaW1hZ2VIYXNoOiBzdHJpbmdcbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTwnZmF2b3JpdGVkJz4+IHtcbiAgY29uc3QgdXJsID0gYCR7SU1BR0VfRU5EUE9JTlR9LyR7aW1hZ2VIYXNofS9mYXZvcml0ZWA7XG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKFxuICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KHsgdXJsLCBtZXRob2Q6ICdQT1NUJyB9KVxuICApIGFzIEltZ3VyQXBpUmVzcG9uc2U8J2Zhdm9yaXRlZCc+O1xufVxuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHsgSU1BR0VfRU5EUE9JTlQgfSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcbmltcG9ydCB7IEltZ3VyQXBpUmVzcG9uc2UsIEltYWdlRGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEltYWdlKFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBpbWFnZUhhc2g6IHN0cmluZ1xuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT4+IHtcbiAgY29uc3QgdXJsID0gYCR7SU1BR0VfRU5EUE9JTlR9LyR7aW1hZ2VIYXNofWA7XG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKFxuICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KHsgdXJsIH0pXG4gICkgYXMgSW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9kZWxldGVJbWFnZSc7XG5leHBvcnQgKiBmcm9tICcuL2Zhdm9yaXRlSW1hZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9nZXRJbWFnZSc7XG5leHBvcnQgKiBmcm9tICcuL3VwZGF0ZUltYWdlJztcbmV4cG9ydCAqIGZyb20gJy4vdXBsb2FkJztcbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IElNQUdFX0VORFBPSU5UIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBjcmVhdGVGb3JtLCBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IFBheWxvYWQsIEltZ3VyQXBpUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZUltYWdlUGF5bG9hZFxuICBleHRlbmRzIFBpY2s8UGF5bG9hZCwgJ3RpdGxlJyB8ICdkZXNjcmlwdGlvbic+IHtcbiAgaW1hZ2VIYXNoOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRVcGRhdGVQYXlsb2FkKHA6IFVwZGF0ZUltYWdlUGF5bG9hZCkge1xuICByZXR1cm4gdHlwZW9mIHAudGl0bGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwLmRlc2NyaXB0aW9uID09PSAnc3RyaW5nJztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUltYWdlKFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBwYXlsb2FkOiBVcGRhdGVJbWFnZVBheWxvYWQgfCBVcGRhdGVJbWFnZVBheWxvYWRbXVxuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+IHwgSW1ndXJBcGlSZXNwb25zZTxib29sZWFuPltdPiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBwYXlsb2FkLm1hcCgocDogVXBkYXRlSW1hZ2VQYXlsb2FkKSA9PiB7XG4gICAgICBpZiAoIWlzVmFsaWRVcGRhdGVQYXlsb2FkKHApKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVXBkYXRlIHJlcXVpcmVzIGEgdGl0bGUgYW5kL29yIGRlc2NyaXB0aW9uJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVybCA9IGAke0lNQUdFX0VORFBPSU5UfS8ke3AuaW1hZ2VIYXNofWA7XG4gICAgICBjb25zdCBmb3JtID0gY3JlYXRlRm9ybShwKTtcbiAgICAgIC8qIGVzbGludCBuby1hc3luYy1wcm9taXNlLWV4ZWN1dG9yOiAwICovXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoXG4gICAgICAgICAgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShcbiAgICAgICAgICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgZGF0YTogZm9ybSxcbiAgICAgICAgICAgICAgLy8gcmVzb2x2ZUJvZHlPbmx5OiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApIGFzIEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj5cbiAgICAgICAgKTtcbiAgICAgIH0pIGFzIFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxib29sZWFuPj47XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgaWYgKCFpc1ZhbGlkVXBkYXRlUGF5bG9hZChwYXlsb2FkKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVXBkYXRlIHJlcXVpcmVzIGEgdGl0bGUgYW5kL29yIGRlc2NyaXB0aW9uJyk7XG4gIH1cblxuICBjb25zdCB1cmwgPSBgJHtJTUFHRV9FTkRQT0lOVH0vJHtwYXlsb2FkLmltYWdlSGFzaH1gO1xuICBjb25zdCBmb3JtID0gY3JlYXRlRm9ybShwYXlsb2FkKTtcbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gICAgYXdhaXQgY2xpZW50LnJlcXVlc3Qoe1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBkYXRhOiBmb3JtLFxuICAgICAgLy8gcmVzb2x2ZUJvZHlPbmx5OiB0cnVlLFxuICAgIH0pXG4gICkgYXMgSW1ndXJBcGlSZXNwb25zZTxib29sZWFuPjtcbn1cbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7XG4gIGNyZWF0ZUZvcm0sXG4gIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UsXG4gIC8vIGdldFNvdXJjZSxcbn0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IFBheWxvYWQsIEltZ3VyQXBpUmVzcG9uc2UsIEltYWdlRGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBVUExPQURfRU5EUE9JTlQgfSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwbG9hZChcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgcGF5bG9hZDogc3RyaW5nIHwgc3RyaW5nW10gfCBQYXlsb2FkIHwgUGF5bG9hZFtdXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPiB8IEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPltdPiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBwYXlsb2FkLm1hcCgocDogc3RyaW5nIHwgUGF5bG9hZCkgPT4ge1xuICAgICAgY29uc3QgZm9ybSA9IGNyZWF0ZUZvcm0ocCk7XG5cbiAgICAgIC8qIGVzbGludCBuby1hc3luYy1wcm9taXNlLWV4ZWN1dG9yOiAwICovXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKFxuICAgICAgICAgICAgYXdhaXQgY2xpZW50LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6IFVQTE9BRF9FTkRQT0lOVCxcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGRhdGE6IGZvcm0sXG4gICAgICAgICAgICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IChwcm9ncmVzc0V2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coeyBwcm9ncmVzc0V2ZW50IH0pO1xuICAgICAgICAgICAgICAgIGNsaWVudC5lbWl0KCd1cGxvYWRQcm9ncmVzcycsIHsgLi4ucHJvZ3Jlc3NFdmVudCB9KTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSBhcyBJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT5cbiAgICAgICAgKTtcbiAgICAgIH0pIGFzIFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+PjtcbiAgICB9KTtcbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgY29uc3QgZm9ybSA9IGNyZWF0ZUZvcm0ocGF5bG9hZCk7XG4gIC8vIGNvbnN0IGlkID0gRGF0ZS5ub3cudG9TdHJpbmcoKTtcbiAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGNsaWVudC5yZXF1ZXN0KHtcbiAgICB1cmw6IFVQTE9BRF9FTkRQT0lOVCxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBkYXRhOiBmb3JtLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IChwcm9ncmVzc0V2ZW50KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh7IHByb2dyZXNzRXZlbnQgfSk7XG4gICAgICBjbGllbnQuZW1pdCgndXBsb2FkUHJvZ3Jlc3MnLCB7IC4uLnByb2dyZXNzRXZlbnQgfSk7XG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcbiAgICBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKHJlcXVlc3QpIGFzIEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPlxuICApO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZm9ybS1kYXRhXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0c2xpYlwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiZXhwb3J0IHsgSW1ndXJDbGllbnQsIEltZ3VyQ3JlZGVudGlhbHMgfSBmcm9tICcuL2NsaWVudCc7XG4iXSwic291cmNlUm9vdCI6IiJ9
