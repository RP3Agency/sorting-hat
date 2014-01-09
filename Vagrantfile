# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
  config.vm.box = "precise32"
  config.vm.provision :shell, :path => "provisioning/bootstrap.sh"
  config.vm.network :forwarded_port, host: 1337, guest: 80
  config.vm.synced_folder ".", "/vagrant", id: "vagrant-root", :mount_options => ["dmode=777","fmode=666"]
end