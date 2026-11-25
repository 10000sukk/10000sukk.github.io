export const SITE_TITLE = '10000sukk';
export const SITE_TAGLINE = 'Notes from after hours';
export const SITE_DESCRIPTION = '퇴근 후에 만든 것들의 기록.';
export const GITHUB_URL = 'https://github.com/10000sukk';
export const HOME_SUB_POSTS = 3; // latest posts shown under each featured post
export const TAG_PAGE_SIZE = 10;

// 소개 페이지(/about)에 보이는 링크. 위에서부터 순서대로 나온다.
export const LINKS: { label: string; href: string; note?: string; icon?: 'github' | 'instagram' | 'dm'; primary?: boolean }[] = [
  { label: 'GitHub', href: GITHUB_URL, note: 'github.com/10000sukk', icon: 'github' },
  { label: 'Instagram', href: 'https://instagram.com/10000sukk', note: '@10000sukk', icon: 'instagram' },
  { label: '협업 제안', href: 'https://ig.me/m/10000sukk', note: '인스타 DM 으로 보내 주세요', icon: 'dm', primary: true },
];
