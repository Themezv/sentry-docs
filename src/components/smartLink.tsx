import React from 'react';
import {Link} from 'gatsby';

import ExternalLink from './externalLink';

type Props = {
  activeClassName?: string;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  remote?: boolean;
  target?: string;
  title?: string;
  to?: string;
};

export default function SmartLink({
  to,
  href,
  children,
  activeClassName = 'active',
  remote = false,
  className = '',
  ...props
}: Props): JSX.Element {
  const realTo = to || href || '';
  if (realTo.indexOf('://') !== -1) {
    return (
      <ExternalLink href={realTo} className={className} {...props}>
        {children || to || href}
      </ExternalLink>
    );
  }
  if (
    // this handles cases like anchor tags (where Link messes thats up)
    realTo.indexOf('/') !== 0 ||
    remote ||
    // target-blank links are typically links to images, where Link doesn't
    // work either. Those links are generated by gatsby-remark-images only, but
    // since this component is overwriting all <a> tags, Link messes that up
    // too.
    //
    // In any case, any target=_blank link doesn't work with Link, so this is
    // not just some heuristic to find images, but *also* just the right thing
    // to do for those types of links.
    //
    // See https://github.com/getsentry/sentry-docs/issues/3152 for more info.
    props.target === '_blank'
  ) {
    return (
      <a href={realTo} className={className} {...props}>
        {children || to || href}
      </a>
    );
  }
  return (
    <Link to={realTo} activeClassName={activeClassName} className={className} {...props}>
      {children || to || href}
    </Link>
  );
}
