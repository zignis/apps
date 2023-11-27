import React, { ReactElement } from 'react';
import { CardType } from '../article/articleCard';
import { CardContainer } from '../atoms/CardContainer';
import { Card } from '../atoms/Card';
import { CardButton } from '../atoms/CardAction';
import SourceButton from '../../../cards/SourceButton';
import { ProfilePicture } from '../../../ProfilePicture';
import {
  Typography,
  TypographyColor,
  TypographyType,
} from '../../../typography/Typography';
import MetaContainer from '../atoms/MetaContainer';
import { Separator } from '../../../cards/common';
import CreatedAt from '../atoms/CreatedAt';
import OptionsButton from '../../../buttons/OptionsButton';
import TextImage from '../atoms/TextImage';
import { UpvoteButton } from '../atoms/UpvoteButton';
import { CommentButton } from '../atoms/CommentButton';
import ShareButton from '../atoms/ShareButton';

export const SquadShareCard = ({ post }: CardType): ReactElement => {
  return (
    <CardContainer className="group/card">
      <Card>
        <CardButton />
        <header className="flex relative flex-row gap-2 m-2 mb-3">
          <div className="relative">
            <SourceButton
              source={post.source}
              size="xsmall"
              className="absolute -right-2 -bottom-2"
            />
            <ProfilePicture user={post.author} size="large" />
          </div>
          <div className="flex flex-col flex-1 mr-6 ml-2">
            <Typography type={TypographyType.Footnote} bold>
              {post.author.name}
            </Typography>
            <MetaContainer
              type={TypographyType.Footnote}
              color={TypographyColor.Tertiary}
            >
              <Typography bold>@{post.author.username}</Typography>
              <Separator />
              <CreatedAt createdAt={post.createdAt} />
            </MetaContainer>
          </div>
          <div className="flex invisible group-hover/card:visible flex-row gap-2 self-start ml-auto">
            <OptionsButton tooltipPlacement="top" />
          </div>
        </header>
        <section>
          <div className="px-2 pt-2 pb-3">
            <Typography type={TypographyType.Callout} className="line-clamp-6">
              {post.title}
            </Typography>
          </div>
        </section>
        <TextImage
          className="gap-2 mb-2"
          text={
            <Typography
              type={TypographyType.Footnote}
              color={TypographyColor.Secondary}
            >
              {post.sharedPost.title}
            </Typography>
          }
          image={post.sharedPost.image}
        />
        <footer className="flex flex-row justify-between mx-4">
          <UpvoteButton post={post} />
          <CommentButton post={post} />
          <ShareButton post={post} />
        </footer>
      </Card>
    </CardContainer>
  );
};
