import React, { ReactElement, useEffect, useState } from 'react';
import { Modal, ModalProps } from '../common/Modal';
import { cloudinary } from '../../../lib/image';
import { ModalSize } from '../common/types';
import { ButtonSize, ButtonVariant } from '../../buttons/ButtonV2';
import { link } from '../../../lib/links';
import { AnalyticsEvent, TargetId, TargetType } from '../../../lib/analytics';
import { ReferralCampaignKey, useReferralCampaign } from '../../../hooks';
import ReferralSocialShareButtons from '../../widgets/ReferralSocialShareButtons';
import { useAnalyticsContext } from '../../../contexts/AnalyticsContext';
import { InviteLinkInput } from '../../referral/InviteLinkInput';
import { ModalClose } from '../common/ModalClose';

function GenericReferralModal({
  onRequestClose,
  ...props
}: ModalProps): ReactElement {
  const [shareState, setShareState] = useState(false);
  const { url } = useReferralCampaign({
    campaignKey: ReferralCampaignKey.Generic,
  });
  const inviteLink = url || link.referral.defaultUrl;
  const { trackEvent } = useAnalyticsContext();

  useEffect(() => {
    trackEvent({
      event_name: AnalyticsEvent.Impression,
      target_type: TargetType.ReferralPopup,
    });

    // @NOTE see https://dailydotdev.atlassian.net/l/cp/dK9h1zoM
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal {...props} onRequestClose={onRequestClose} size={ModalSize.Small}>
      <ModalClose
        onClick={onRequestClose}
        variant={ButtonVariant.Secondary}
        size={ButtonSize.Small}
        top="4"
        right="4"
        zIndex="2"
      />
      <Modal.Body>
        <div className="relative z-1 mb-5 flex aspect-square w-full flex-col items-center justify-end">
          <h1 className="mb-4 font-bold typo-mega3">Invite friends</h1>
          <p className="text-theme-label-secondary typo-title3">
            And make Ido (our CTO) smile again.
          </p>
        </div>
        <img
          src={
            cloudinary.referralCampaign.generic[!shareState ? 'sad' : 'happy']
          }
          alt={!shareState ? 'CTO Ido looking sad' : 'CTO Ido looking happy'}
          className="absolute left-0 top-0 z-0 aspect-square w-full object-cover"
        />
        <InviteLinkInput
          targetId={TargetId.GenericReferralPopup}
          link={inviteLink}
          onCopy={() => setShareState(true)}
          text={{ initial: 'Copy link 😀', copied: 'Copied 😉' }}
        />
        <div className="mt-7 flex items-center justify-center gap-3">
          <p className="mr-1 text-theme-label-tertiary typo-callout">
            Invite via
          </p>
          <ReferralSocialShareButtons
            url={url}
            targetType={TargetType.GenericReferralPopup}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default GenericReferralModal;
