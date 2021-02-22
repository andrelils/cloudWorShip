import { useEffect, useState } from "react";

interface loadProps {
  mountedId?: string;
  loadMethod?: any;
  total?: number;
  size?: number;
  frontPage?: boolean;
  loading?: boolean;
}

export default (defaultConfig: loadProps) => {
  const {
    size = 10,
    mountedId = "",
    frontPage = true,
    total,
    loadMethod,
    loading,
  } = defaultConfig;

  const [page, setPage] = useState(1);
  const [pageSize] = useState(size);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    let el = window as any;
    if (mountedId) {
      el = document.getElementById(mountedId);
    }
    if (frontPage && page * pageSize >= total && total > 0) {
      setIsEnd(true);
      return;
    }
    const listener = () => {
      let element;
      let scrollTop;
      let clientHeight;
      let scrollHeight;

      if (mountedId) {
        element = document.getElementById(mountedId);
        scrollTop = element.scrollTop;
        clientHeight = element.clientHeight;
        scrollHeight = element.scrollHeight;
      } else {
        scrollHeight = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        );
        scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        clientHeight =
          window.innerHeight ||
          Math.min(
            document.documentElement.clientHeight,
            document.body.clientHeight
          );
      }
      if (page * pageSize >= total && frontPage) {
        setIsEnd(true);
        return;
      }
      if (scrollHeight - scrollTop <= clientHeight + 6) {
        if (frontPage) {
          setPage(page + 1);
          loadMethod && loadMethod();
        } else {
          if (!loading) {
            el.scrollTo({
              top: scrollTop - 100,
            });
            loadMethod && loadMethod();
          }
        }
      }
    };
    if (el) {
      el.addEventListener("scroll", listener);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", listener);
      }
    };
  });
  return frontPage
    ? {
        len: page * pageSize,
        isEnd,
        page,
      }
    : {};
};
