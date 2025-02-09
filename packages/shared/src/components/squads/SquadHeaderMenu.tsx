import React, { ReactElement, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import {
  Squad,
  SourcePermissions,
  SourceMemberRole,
} from '../../graphql/sources';
import { useLazyModal } from '../../hooks/useLazyModal';
import { LazyModal } from '../modals/common/types';
import { useDeleteSquad } from '../../hooks/useDeleteSquad';
import { useLeaveSquad, useSquadNavigation } from '../../hooks';
import ContextMenuItem, { ContextMenuIcon } from '../tooltips/ContextMenuItem';
import { verifyPermission } from '../../graphql/squads';
import {
  SettingsIcon,
  TrashIcon,
  FeedbackIcon,
  TourIcon,
  LinkIcon,
  ExitIcon,
} from '../icons';
import { squadFeedback } from '../../lib/constants';
import { MenuItemProps } from '../fields/PortalMenu';
import { useSquadInvitation } from '../../hooks/useSquadInvitation';
import { Origin } from '../../lib/analytics';

const PortalMenu = dynamic(
  () => import(/* webpackChunkName: "portalMenu" */ '../fields/PortalMenu'),
  {
    ssr: false,
  },
);

interface SquadHeaderMenuProps {
  squad: Squad;
}

export default function SquadHeaderMenu({
  squad,
}: SquadHeaderMenuProps): ReactElement {
  const { trackAndCopyLink } = useSquadInvitation({
    squad,
    origin: Origin.SquadPage,
  });
  const router = useRouter();
  const { openModal } = useLazyModal();
  const { editSquad } = useSquadNavigation();

  const { onDeleteSquad } = useDeleteSquad({
    squad,
    callback: () => router.replace('/'),
  });

  const { mutateAsync: onLeaveSquad } = useMutation(useLeaveSquad({ squad }), {
    onSuccess: (left) => {
      if (!left) {
        return;
      }

      router.replace('/');
    },
  });

  const items = useMemo(() => {
    const canEditSquad = verifyPermission(squad, SourcePermissions.Edit);
    const canDeleteSquad = verifyPermission(squad, SourcePermissions.Delete);

    const list: MenuItemProps[] = [];

    if (canEditSquad) {
      list.push({
        icon: <ContextMenuIcon Icon={SettingsIcon} />,
        action: () => editSquad({ handle: squad.handle }),
        label: 'Squad settings',
      });
    }

    if (!squad.currentMember && squad.public) {
      list.push({
        icon: <ContextMenuIcon Icon={LinkIcon} />,
        action: () => trackAndCopyLink(),
        label: 'Invitation link',
      });
    }

    list.push({
      icon: <ContextMenuIcon Icon={TourIcon} />,
      action: () =>
        openModal({
          type: LazyModal.SquadTour,
        }),
      label: 'Learn how Squads work',
    });

    if (squad.currentMember) {
      list.push({
        icon: <ContextMenuIcon Icon={FeedbackIcon} />,
        anchorProps: {
          href: `${squadFeedback}#user_id=${squad?.currentMember?.user?.id}&squad_id=${squad.id}`,
          target: '_blank',
        },
        label: 'Feedback',
      });
    }

    if (canDeleteSquad) {
      list.push({
        icon: <ContextMenuIcon Icon={TrashIcon} />,
        action: onDeleteSquad,
        label: 'Delete Squad',
      });
    }

    if (
      squad.currentMember &&
      squad.currentMember.role !== SourceMemberRole.Admin
    ) {
      list.push({
        icon: <ContextMenuIcon Icon={ExitIcon} />,
        action: () => {
          onLeaveSquad();
        },
        label: 'Leave Squad',
      });
    }

    return list;
  }, [
    editSquad,
    onDeleteSquad,
    trackAndCopyLink,
    onLeaveSquad,
    openModal,
    squad,
  ]);

  return (
    <PortalMenu
      disableBoundariesCheck
      id="squad-menu-context"
      className="menu-primary"
      animation="fade"
    >
      {items.map((props) => (
        <ContextMenuItem key={props.label} {...props} />
      ))}
    </PortalMenu>
  );
}
