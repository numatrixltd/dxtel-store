"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progressively reveals items from a long list so the DOM only renders what's
 * needed. Starts with `pageSize` items and reveals `pageSize` more each time
 * the sentinel element scrolls into view (IntersectionObserver), which keeps
 * long lists (100+ partners) fast on first paint.
 *
 * @param {number} totalCount - total number of items available
 * @param {number} pageSize - how many items to reveal per batch
 * @param {*} resetKey - when this value changes, the reveal count resets
 */
export default function useLazyReveal(totalCount, pageSize = 12, resetKey) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sentinelRef = useRef(null);

  // Reset how many items are shown whenever the underlying list changes
  // (e.g. switching tabs or typing a new search query).
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [resetKey, pageSize]);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + pageSize, totalCount));
  };

  // Observe the sentinel and auto-load the next batch as it enters the
  // viewport (with a generous rootMargin so it loads slightly ahead of time).
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || visibleCount >= totalCount) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount, totalCount, pageSize]);

  const hasMore = visibleCount < totalCount;

  return { visibleCount, sentinelRef, loadMore, hasMore };
}
