import defaultSettings from '@/settings'

const title = defaultSettings.title || 'iHRM'

/**
 * 获取页面标题
 * @param {string} pageTitle 原始页面标题
 * @returns 标题
 */
export default function getPageTitle(pageTitle) {
  if (pageTitle) return `${pageTitle} - ${title}`
  return `${title}`
}
