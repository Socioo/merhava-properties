import { TeamMember } from '../../types';

interface TeamMemberProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberProps) {
  return (
    <div className="team-member-card">
      <div className="member-image">
        <img src={member.image} alt={member.name} />
      </div>
      <div className="member-info">
        <h3>{member.name}</h3>
        <p className="position">{member.position}</p>
        <p className="bio">{member.bio}</p>
        <div className="contact-info">
          <p>📧 {member.email}</p>
          <p>📞 {member.phone}</p>
        </div>
      </div>
    </div>
  );
}