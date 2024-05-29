/**
 *
 *  This is the Page Head
 *
 */

import { useRouter } from "next/router";

import Head from "next/head";

export const PageHead = (props) => {
  const router = useRouter();

  const PAGE_HEAD_OBJ = props.pageHeadObj;

  const TITLE = "DWT Clients/Projects DB - " + PAGE_HEAD_OBJ.pageTitle;

  const ICONS = {
    favicon:
      "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/favicon/favicon.ico",
    f16: "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/favicon/favicon-16x16.png",
    f32: "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/favicon/favicon-32x32.png",
    f48: "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/favicon/favicon-48x48.png",
    f64: "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/favicon/favicon-64x64.png",
    f96: "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/favicon/favicon-96x96.png",
    f128: "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/favicon/favicon-128x128.png",
    f192: "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/favicon/favicon-192x192.png",
    f512: "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/favicon/favicon-512x512.png",
    ati57:
      "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/apple-touch/apple-touch-icon-57x57.png",
    ati76:
      "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/apple-touch/apple-touch-icon-76x76.png",
    ati120:
      "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/apple-touch/apple-touch-icon-120x120.png",
    ati152:
      "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/apple-touch/apple-touch-icon-152x152.png",
    ati180:
      "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/apple-touch/apple-touch-icon-180x180.png",
    android72:
      "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/android/android-icon-72x72.png",
    android96:
      "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/android/android-icon-96x96.png",
    android144:
      "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/android/android-icon-144x144.png",
    android192:
      "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/android/android-icon-192x192.png",
    ms32: "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/ms-app/ms-app-icon-32x32.png",
    ms70: "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/ms-app/ms-app-icon-70x70.png",
    ms150:
      "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/ms-app/ms-app-icon-150x150.png",
    ms310:
      "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies/icons/tab-icons/ms-app/ms-app-icon-310x150.png",
  };

  return (
    <Head>
      <title>{TITLE}</title>

      {/**
      <meta name="keywords" content={props.page_head_data.pageKeywords} />
      <meta name="description" content={props.page_head_data.pageDesc} />
      <meta name="robots" content={props.page_head_data.pageRobots} />
      <link rel="canonical" href={props.page_head_data.pageCanonical} />
      */}

      {/** FACEBOOK */}

      {/**
      <meta property="og:title" content={props.page_head_data.pageOGTitle} />
      <meta name="og:description" content={props.page_head_data.pageDesc} />
      <meta name="og:url" content={props.page_head_data.pageCanonical} />
      <meta name="og:image" content={props.page_head_data.pageOGImage} />
      <meta property="og:type" content={props.page_head_data.pageOGType} />
      <meta property="og:locale" content={props.page_head_data.pageOGLocale} />
      <meta
        name="article:author"
        content={"Parker Phelps and Collin Westgate"}
      />
      */}

      {/** LINKEDIN */}
      {/**
      <meta property="og:linkedin" content={props.page_head_data.linkedIn} />
      */}

      <link rel="icon" type="image/x-icon" href={ICONS.favicon} />
      <link rel="icon" type="image/png" sizes="16x16" href={ICONS.f16} />
      <link rel="icon" type="image/png" sizes="32x32" href={ICONS.f32} />
      <link rel="icon" type="image/png" sizes="48x48" href={ICONS.f48} />
      <link rel="icon" type="image/png" sizes="64x64" href={ICONS.f64} />
      <link rel="icon" type="image/png" sizes="96x96" href={ICONS.f96} />
      <link rel="icon" type="image/png" sizes="128x128" href={ICONS.f128} />
      <link rel="icon" type="image/png" sizes="192x192" href={ICONS.f192} />
      <link rel="icon" type="image/png" sizes="512x512" href={ICONS.f512} />
      <link rel="apple-touch-icon" sizes="57x57" href={ICONS.ati57} />
      <link rel="apple-touch-icon" sizes="76x76" href={ICONS.ati76} />
      <link rel="apple-touch-icon" sizes="120x120" href={ICONS.ati120} />
      <link rel="apple-touch-icon" sizes="152x152" href={ICONS.ati152} />
      <link rel="apple-touch-icon" sizes="180x180" href={ICONS.ati180} />
      <link rel="icon" type="image/png" sizes="72x72" href={ICONS.android72} />
      <link rel="icon" type="image/png" sizes="96x96" href={ICONS.android96} />
      <link
        rel="icon"
        type="image/png"
        sizes="144x144"
        href={ICONS.android144}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={ICONS.android192}
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content={ICONS.ms32} />
      <meta name="msapplication-square70x70logo" content={ICONS.ms70} />
      <meta name="msapplication-square150x150logo" content={ICONS.ms150} />
      <meta name="msapplication-wide310x150logo" content={ICONS.ms310} />
    </Head>
  );
};
