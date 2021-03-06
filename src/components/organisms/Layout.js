import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import {
  HomeOutlined,
  PlusCircleOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useUser } from "../../../context/userContext";
import LayoutStyles from "../../../styles/layout.module.css";

export default function Layout({ children }) {
  const router = useRouter();
  const { loadingUser, user, isBlocked } = useUser();
  if (loadingUser) return <p></p>;
  return (
    <div className={LayoutStyles.outerContainer}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Pushquery | Where SciComm Happens</title>
        <meta
          name="description"
          content="A scholarly and science communication community"
        />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/dx35aw3ub/image/upload/v1591064978/icon_prufa1.png`}
        />
        <meta name="og:title" content="Pushquery | Where SciComm Happens" />
        <meta
          name="twitter:card"
          content={`https://res.cloudinary.com/dx35aw3ub/image/upload/v1591064978/icon_prufa1.png`}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W4QYGFBM71"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-W4QYGFBM71');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
            heap.load("1915289989");
                `,
          }}
        />
      </Head>
      <header>
        <div className={LayoutStyles.headerContainer}>
          <Link href="/">
            <a>
              {router.pathname == "/" ? (
                <div className={LayoutStyles.headerIconBox}>
                  <HomeOutlined
                    style={{ fontSize: "3rem", color: "#6BC88F" }}
                  />
                  <p>Home</p>
                </div>
              ) : (
                <div className={LayoutStyles.headerIconBox}>
                  <HomeOutlined style={{ fontSize: "3rem", color: "#333" }} />
                  <p>Home</p>
                </div>
              )}
            </a>
          </Link>
          <Link href="/create">
            <a>
              {router.pathname == "/create" ? (
                <div className={LayoutStyles.headerIconBox}>
                  <PlusCircleOutlined
                    style={{ fontSize: "3rem", color: "#6BC88F" }}
                  />
                  <p>Create</p>
                </div>
              ) : (
                <div className={LayoutStyles.headerIconBox}>
                  <PlusCircleOutlined
                    style={{ fontSize: "3rem", color: "#333" }}
                  />
                  <p>Create</p>
                </div>
              )}
            </a>
          </Link>
          <Link href="/values">
            <a>
              {router.pathname == "/values" ? (
                <div className={LayoutStyles.headerIconBox}>
                  <HeartOutlined
                    style={{ fontSize: "3rem", color: "#6BC88F" }}
                  />
                  <p>Values</p>
                </div>
              ) : (
                <div className={LayoutStyles.headerIconBox}>
                  <HeartOutlined style={{ fontSize: "3rem", color: "#333" }} />
                  <p>Values</p>
                </div>
              )}
            </a>
          </Link>
          {user ? (
            <Link href="/profile">
              <a>
                {router.pathname == "/login" || router.pathname == "/signup" ? (
                  <div className={LayoutStyles.headerIconBox}>
                    <UserOutlined
                      style={{ fontSize: "3rem", color: "#6BC88F" }}
                    />
                    <p>Me</p>
                  </div>
                ) : (
                  <div className={LayoutStyles.headerIconBox}>
                    <UserOutlined style={{ fontSize: "3rem", color: "#333" }} />
                    <p>Me</p>
                  </div>
                )}
              </a>
            </Link>
          ) : (
            <Link href="/login">
              <a>
                {router.pathname == "/login" || router.pathname == "/signup" ? (
                  <div className={LayoutStyles.headerIconBox}>
                    <UserOutlined
                      style={{ fontSize: "3rem", color: "#6BC88F" }}
                    />
                    <p>Me</p>
                  </div>
                ) : (
                  <div className={LayoutStyles.headerIconBox}>
                    <UserOutlined style={{ fontSize: "3rem", color: "#333" }} />
                    <p>Me</p>
                  </div>
                )}
              </a>
            </Link>
          )}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
