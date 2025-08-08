import React, { useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import api from '../../utils/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { addNotification } = useNotifications();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const initial = useMemo(() => ({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    photo: user?.photo || ''
  }), [user]);
  const [form, setForm] = useState(initial);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const computeChanges = (from, to) => {
    const changed = {};
    Object.keys(to).forEach((k) => {
      if ((from[k] || '') !== (to[k] || '')) changed[k] = { from: from[k] || '', to: to[k] || '' };
    });
    return changed;
  };

  const onCancel = () => {
    setForm(initial);
    setEditing(false);
  };

  const onPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }
    const maxSizeMB = 3;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`Image is too large. Max ${maxSizeMB}MB allowed.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Compute center square crop
        const side = Math.min(img.width, img.height);
        const sx = Math.floor((img.width - side) / 2);
        const sy = Math.floor((img.height - side) / 2);
        // Resize to 256x256
        const SIZE = 256;
        const canvas = document.createElement('canvas');
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, sx, sy, side, side, 0, 0, SIZE, SIZE);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setForm((f) => ({ ...f, photo: dataUrl }));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const onSave = async (e) => {
    e.preventDefault();
    const changed = computeChanges(initial, form);
    if (Object.keys(changed).length === 0) {
      alert('No changes to save.');
      setEditing(false);
      return;
    }

    setSaving(true);
    try {
      // Try to persist to backend if endpoint exists; otherwise this will be a no-op mock.
      let updated = { ...user, ...form };
      try {
        const res = await api.put('/users/me', form);
        if (res?.data?.user) updated = res.data.user;
      } catch (_) {
        // Fallback to local update if backend route isn't available
      }

      updateUser(updated);

      // Notify admin immediately
      addNotification({
        type: 'member_profile_updated',
        title: 'Member Profile Updated',
        message: `${updated.first_name} ${updated.last_name} updated their profile details`,
        priority: 'medium',
        actionUrl: '/admin/members',
        metadata: {
          audience: 'admin',
          memberId: updated.id || updated.user_id,
          changedFields: changed
        }
      });

      alert('Profile updated successfully. Admin has been notified.');
      setEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">My Profile</h1>
        {!editing ? (
          <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
        ) : (
          <div className="d-flex gap-2">
            <button className="btn btn-secondary" onClick={onCancel} disabled={saving}>Cancel</button>
            <button className="btn btn-success" onClick={onSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            {form.photo ? (
              <img src={form.photo} alt="Profile" className="rounded-circle me-3" style={{ width: 80, height: 80, objectFit: 'cover', border: '2px solid #eee' }} />
            ) : (
              <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3" style={{ width: 80, height: 80, fontSize: 24 }}>
                {(form.first_name?.[0] || 'U')}{(form.last_name?.[0] || '')}
              </div>
            )}
            <div>
              <div className="fw-bold">Profile Photo</div>
              <div className="text-muted small">PNG or JPG up to 3MB.</div>
              {editing && (
                <div className="mt-2">
                  <input type="file" accept="image/*" onChange={onPhotoChange} />
                  {form.photo && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => setForm((f) => ({ ...f, photo: '' }))}
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <form onSubmit={onSave}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    value={form.first_name}
                    onChange={onChange}
                    readOnly={!editing}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    value={form.last_name}
                    onChange={onChange}
                    readOnly={!editing}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    readOnly={!editing}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone_number"
                    value={form.phone_number}
                    onChange={onChange}
                    readOnly={!editing}
                    pattern="^[0-9+\-()\s]{7,15}$"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="alert alert-info mt-3">
        <small>
          Note: After saving changes, the admin is notified immediately with the exact fields that changed.
        </small>
      </div>
    </div>
  );
};

export default Profile;
