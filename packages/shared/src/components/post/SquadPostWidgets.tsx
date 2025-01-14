import React, { ReactElement, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PageWidgets } from '../utilities';
import { ShareMobile } from '../ShareMobile';
import AuthContext, { useAuthContext } from '../../contexts/AuthContext';
import ShareBar from '../ShareBar';
import FurtherReading from '../widgets/FurtherReading';
import { PostHeaderActions } from './PostHeaderActions';
import { PostOrigin } from '../../hooks/analytics/useAnalyticsContextData';
import SourceButton from '../cards/SourceButton';
import { SourceMember, Squad } from '../../graphql/sources';
import { SquadJoinButton } from '../squads/SquadJoinButton';
import { Origin } from '../../lib/analytics';
import { useSquad } from '../../hooks';
import { getSquadMembers } from '../../graphql/squads';
import SquadMemberShortList from '../squads/SquadMemberShortList';
import { PostHeaderActionsProps } from './common';

interface PostWidgetsProps
  extends Omit<PostHeaderActionsProps, 'contextMenuId'> {
  origin?: PostOrigin;
}

const SquadCard = ({ squadSource }: { squadSource: Squad }) => {
  const { isFetched } = useAuthContext();
  const { id: squadId, handle } = squadSource;
  const { squad } = useSquad({ handle });

  const { data: squadMembers } = useQuery<SourceMember[]>(
    ['squadMembersInitial', handle],
    () => getSquadMembers(squadId),
    { enabled: isFetched && !!squadId },
  );

  if (!squad) {
    return null;
  }

  return (
    <div className="rounded-16 border border-theme-divider-tertiary p-4">
      <div className="flex flex-row justify-between">
        <SourceButton source={squad} size="xxxlarge" />
        <SquadMemberShortList
          squad={squad}
          members={squadMembers}
          className="h-10"
        />
      </div>
      <h3 className="mt-3 text-theme-label-primary typo-title2">
        {squad.name}
      </h3>
      <h4 className="text-theme-label-tertiary typo-callout">{`@${squad.handle}`}</h4>
      {squad.description && (
        <p className="mt-1 text-theme-label-tertiary typo-callout">
          {squad.description}
        </p>
      )}
      <SquadJoinButton
        className="mt-3 w-full"
        squad={squad}
        origin={Origin.ArticleModal}
      />
      {!squad.currentMember && (
        <p className="mt-3 text-theme-label-tertiary typo-callout">
          Join Squad to see more posts from {squad.name}
        </p>
      )}
    </div>
  );
};

export function SquadPostWidgets({
  onShare,
  post,
  className,
  onClose,
}: PostWidgetsProps): ReactElement {
  const { tokenRefreshed } = useContext(AuthContext);
  const squad = post.source as Squad;

  return (
    <PageWidgets className={className}>
      <PostHeaderActions
        onShare={onShare}
        post={post}
        onClose={onClose}
        className="hidden pt-6 tablet:flex"
        contextMenuId="post-widgets-context"
      />
      {!!squad && !squad.currentMember && <SquadCard squadSource={squad} />}
      <ShareBar post={post} />
      <ShareMobile post={post} share={onShare} link={post.commentsPermalink} />
      {tokenRefreshed && <FurtherReading currentPost={post} />}
    </PageWidgets>
  );
}
