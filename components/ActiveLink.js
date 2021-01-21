import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import activeLinkStyles from './ActiveLink.module.scss';

const ActiveLink = ({ href, children }) => {
  const router = useRouter();

  let rootPath = `/${router.pathname.split('/')[1]}`;
  let className = children.props.className || '';
  if (router.pathname === href || rootPath === href) {
    className = `${className} ${activeLinkStyles.selected}`;
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
};

export default ActiveLink;
