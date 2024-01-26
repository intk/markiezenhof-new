"""Setup tests for this package."""
from haagshistorischmuseum.testing import HAAGSHISTORISCHMUSEUM_INTEGRATION_TESTING
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from Products.CMFPlone.utils import get_installer

import unittest


class TestSetup(unittest.TestCase):
    """Test that haagshistorischmuseum is properly installed."""

    layer = HAAGSHISTORISCHMUSEUM_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        self.setup = self.portal.portal_setup
        self.installer = get_installer(self.portal, self.layer["request"])

    def test_product_installed(self):
        """Test if haagshistorischmuseum is installed."""
        self.assertTrue(self.installer.is_product_installed("haagshistorischmuseum"))

    def test_browserlayer(self):
        """Test that IHAAGSHISTORISCHMUSEUMLayer is registered."""
        from haagshistorischmuseum.interfaces import IHAAGSHISTORISCHMUSEUMLayer
        from plone.browserlayer import utils

        self.assertIn(IHAAGSHISTORISCHMUSEUMLayer, utils.registered_layers())

    def test_latest_version(self):
        """Test latest version of default profile."""
        self.assertEqual(
            self.setup.getLastVersionForProfile("haagshistorischmuseum:default")[0],
            "20230428001",
        )


class TestUninstall(unittest.TestCase):

    layer = HAAGSHISTORISCHMUSEUM_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]
        self.installer = get_installer(self.portal, self.layer["request"])
        roles_before = api.user.get_roles(TEST_USER_ID)
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.installer.uninstall_product("haagshistorischmuseum")
        setRoles(self.portal, TEST_USER_ID, roles_before)

    def test_product_uninstalled(self):
        """Test if haagshistorischmuseum is cleanly uninstalled."""
        self.assertFalse(self.installer.is_product_installed("haagshistorischmuseum"))

    def test_browserlayer_removed(self):
        """Test that IHAAGSHISTORISCHMUSEUMLayer is removed."""
        from haagshistorischmuseum.interfaces import IHAAGSHISTORISCHMUSEUMLayer
        from plone.browserlayer import utils

        self.assertNotIn(IHAAGSHISTORISCHMUSEUMLayer, utils.registered_layers())
